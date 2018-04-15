const config = require('../config');
const redis  = require('../redis');

class EcosisSync {
  
  /**
   * @method syncOrgs
   * @description sync all orgs from EcoSIS
   * 
   * @returns {Promise}
   */
  async syncOrgs() {
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
  }

  /**
   * @method syncOrg
   * @description sync ecosis org to redis store
   * 
   * @param {String} orgName EcoSIS org name
   * 
   * @returns {Promise} 
   */
  async syncOrg(orgName) {
    // grab org from ecosis
    let org = await ckan.getOrganization(orgName);
    if( !org ) return;

    // remove org keys
    await redis.client.del(redis.createOrgKey(orgName));

    // find role keys to remove
    let searchKey = redis.createAuthKey(org, '*', '*');
    let keys = await redis.client.keys(searchKey);
    for( let i = 0; i < keys.length; i++ ) {
      await redis.client.del(keys[i]);
    }

    // if org is not active, we are done
    if( org.state !== 'active' ) return;

    // create org object
    let users = org.users;
    org = {
      id : org.id,
      name : org.name,
      displayName : org.display_name,
      description : org.description,
      logo : org.image_display_url
    };
    await redis.client.set(redis.createOrgKey(org.name), JSON.stringify(org));

    // add user roles
    for( let j = 0; j < users.length; j++ ) {
      let key = redis.createAuthKey(org.name, users[j].name, users[j].capacity);
      let data = {
        org : org.name, 
        user : users[j].username,
        role : users[j].capacity
      }
      await redis.client.set(key, JSON.stringify(data));
    }
  }

}

module.exports = new EcosisSync();