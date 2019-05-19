const config = require('../config');
const redis  = require('../redis');
const logger = require('../logger');
const ckan = require('../ckan');
const mongo = require('../mongo')
const firebase = require('../firebase');
const github = require('./github');

class EcosisSync {

  constructor() {
    this._init();
  }

  /**
   * @method _init
   * @description wire up event listern to firebase module and preform
   * a query for sync events to make sure we didn't miss anything
   */
  async _init() {
    // this is triggered on each firestore doc update
    firebase.initEcoSISObserver(e => {
      e.docChanges().forEach((change) => {
        let data = firebase.getDataFromChangeDoc(change);
        firebase.emitBuffered(data.payload.id, firebase.EVENTS.ECOSIS_ORG_UPDATE, data);
      });
    });

    // this is triggered after a certain amount of time of method call above
    // e is an array of buffered events
    firebase.on(firebase.EVENTS.ECOSIS_ORG_UPDATE, e => this._onChangeEvents(e));
  }

  async _onChangeEvents(events) {
    // we just want the last changes
    let handled = {};

    // these are ordered by timestamp, so we only handle the first
    for( var i = 0; i < events.length; i++ ) {
      let e = events[i];
      if( e.fsChangeType === 'removed' ) continue; // noop

      let msg = e.payload;

      // we already processed a newer event for this org
      if( handled[msg.id] ) {
        try {
          await firebase.ackEcoSISEvent(e.fsId);
        } catch(error) {
          logger.error('Failed to handle firestore ecosis sync event', e, error);
        }
        continue;  
      }

      if( msg.deleted ) {
        try {
          let orgName = await redis.getOrgNameFromId(msg.id);
          await this.removeOrg(orgName);
          await firebase.ackEcoSISEvent(e.fsId);
        } catch(error) {
          logger.error('Failed to handle firestore ecosis sync event', e, error);
        }
      } else {
        try {
          await this.syncOrg(msg.id);
          await firebase.ackEcoSISEvent(e.fsId);
        } catch(error) {
          logger.error('Failed to handle firestore ecosis sync event', e, error);
        }
      }

      handled[msg.id] = true;
    }    
  }
  
  /**
   * @method syncOrgs
   * @description sync all orgs from EcoSIS
   * 
   * @returns {Promise} resolves to Array of org names
   */
  async syncOrgs() {
    logger.info('Syncing CKAN organizations from EcoSIS');

    // make sure we have access to ecosis before we flush
    let orgNames = await ckan.listOrganizations();
    let orgs = [];

    // now flush
    let keys = await redis.client.keys(redis.createOrgKey('*'));
    keys = keys.concat(await redis.client.keys(redis.createAuthKey('*', '*', '*')));
    for( var i = 0; i < keys.length; i++ ) {
      await redis.client.del(keys[i]);
    }

    for( let i = 0; i < orgNames.length; i++ ) {
      await this.syncOrg(orgNames[i]);
    }

    logger.info(`Sync of CKAN organizations from EcoSIS complete. ${orgNames.length} orgs syncd`);

    return orgNames;
  }

  /**
   * @method syncOrg
   * @description sync ecosis org to redis store
   * 
   * @param {String} orgName EcoSIS org name or id
   * 
   * @returns {Promise} 
   */
  async syncOrg(orgName) {
    // grab org from ecosis
    let org = await ckan.getOrganization(orgName);
    if( !org ) return;

    orgName = org.name;
    logger.info(`Syncing EcoSIS organization ${orgName}`);

    await this.removeOrg(orgName, true);

    // if org is not active, we are done
    if( org.state !== 'active' ) return;
    if( !org.is_organization ) return;

    // create org object
    let users = org.users;
    org = {
      id : org.id,
      name : org.name,
      groups : org.groups,
      displayName : org.display_name,
      description : org.description,
      logo : org.image_display_url
    };
    await redis.client.set(redis.createOrgKey(org.name), JSON.stringify(org));

    // add user roles
    for( let j = 0; j < users.length; j++ ) {
      if( users[j].state !== 'active' ) continue;

      let key = redis.createAuthKey(org.name, users[j].name, users[j].capacity);
      let data = {
        org : org.name, 
        user : users[j].name,
        displayName : users[j].displayName,
        role : users[j].capacity
      }
      await redis.client.set(key, JSON.stringify(data));
    }

    // finally sync to Github team
    await github.syncEcoSISOrgToTeam(org.name);
  }

  async syncGithubData() {
    let githubInfo = await ckan.getAllGithubInfo();
    for( let user of githubInfo ) {
      // save to redis
      let key = redis.createUserGithubKey(user.user_id);
      await redis.client.set(key, JSON.stringify({
        username: user.github_username,
        data : JSON.parse(user.github_data),
        accessToken : user.github_access_token
      }));
    }
  }

  /**
   * @method removeOrg
   * @description remove org from redis
   * 
   * @param {String} orgName org to remove
   * @param {Boolean} silent don't log.  used by syncOrg
   * 
   * @returns {Promise}
   */
  async removeOrg(orgName, silent=false) {
    if( !silent ) {
      logger.info(`Removing EcoSIS organization ${orgName}`);
    }

    // remove org keys
    await redis.client.del(redis.createOrgKey(orgName));

    // find role keys to remove
    let searchKey = redis.createAuthKey(orgName, '*', '*');
    let keys = await redis.client.keys(searchKey);
    for( let i = 0; i < keys.length; i++ ) {
      await redis.client.del(keys[i]);
    }
  }

}

module.exports = new EcosisSync();