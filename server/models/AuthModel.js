const ckan = require('../lib/ckan');
const config = require('../lib/config');
const Logger = require('../lib/logger');
const redis = require('redis');
const mongo = require('../lib/mongo');
const {promisify} = require('util');

const redisMethods = ['get', 'keys', 'set', 'exists', 'flushdb'];

class AuthModel {

  constructor() {
    this.REDIS_ORG_PREFIX = 'org';
    this.REDIS_AUTH_PREFIX = 'auth';
    this.REDIS_ADMIN_PREFIX = 'admin';
    
    this.READ_ROLES = {
      member : true
    };

    this.WRITE_ROLES = {
      admin : true,
      editor : true
    };

    this.client = redis.createClient({host: 'redis'});

    redisMethods.forEach(method => {
      this.client[method] = promisify(this.client[method]).bind(this.client)
    });
  }

  /**
   * @method reload
   * @description reload redis.  this clears sessions as well.
   * 
   * @returns {Promise}
   */
  async reload() {
    // make sure we have access to ecosis before we flush
    let orgNames = await ckan.listOrganizations();
    let orgs = [];

    // now flush
    await this.client.flushdb();

    for( let i = 0; i < orgNames.length; i++ ) {
      let org = await ckan.getOrganization(orgNames[i]);
      if( org.state !== 'active' ) continue;

      let users = org.users.map(user => { return {username: user.name, role: user.capacity} });

      org = {
        id : org.id,
        name : org.name,
        displayName : org.display_name,
        description : org.description,
        logo : org.image_display_url
      };

      await this.client.set(this._createOrgRedisKey(org.name), JSON.stringify(org));

      for( let j = 0; j < users.length; j++ ) {
        let key = this._createRedisKey(org.name, users[j].username, users[j].role);
        await this.client.set(key, true);
      }
    }
  }
  
  /**
   * @method hasAccess
   * @description check if user has access to package
   * 
   * @param {String} packageNameOrId package name or id to check
   * @param {String} user username to check
   * @param {String} role either [READ|WRITE]
   * 
   * @returns {Promise} resolves to boolean
   */
  async hasAccess(packageNameOrId, user, role) {
    // first check it it's an admin, they can do everything
    let isAdmin = await this.isAdmin(user);
    if( isAdmin ) return true;
    
    // now grab package
    let pkg = await mongo.getPackage(packageNameOrId, {owner: 1, organization: 1});
    if( !pkg ) throw new Error('Unknown package name or id: '+packageNameOrId);

    // if user is owner, they can do everything
    if( pkg.owner === user ) return true;

    // now see if they have org permissions
    if( !pkg.organization ) return false;

    if( role === 'read' ) {
      return await this.canReadOrg(pkg.organization, user);
    } else if( role === 'write' ) {
      return await this.canWriteOrg(pkg.organization, user);
    }

    return false;
  }

  /**
   * @method isAdmin
   * @description Check is user is a site admin
   * 
   * @param {String} user user you want to check
   * 
   * @returns {Promise} resolve to boolean
   */
  isAdmin(user) {
    return this.client.exists(`${this.REDIS_ADMIN_PREFIX}-${user}`);
  }

  /**
   * @method canWriteOrg
   * @description Check if a user can write to a org 
   * 
   * @param {String} org org you want to check
   * @param {String} user user you want to check
   * 
   * @returns {Promise} resolve to boolean
   */
  async canWriteOrg(org, user) {
    let searchKey = this._createRedisKey(org, user, '*');
    let keys = await this.client.keys(searchKey);

    for( var i = 0; i < keys.length; i++ ) {
      let role = keys[i].split('-').pop();
      if( this.WRITE_ROLES[role] ) return true;
      if( this.READ_ROLES[role] ) return true;
    }

    return false;
  }

  /**
   * @method canReadOrg
   * @description Check if a user can read an org 
   * 
   * @param {String} org org you want to check
   * @param {String} user user you want to check
   * 
   * @returns {Promise} resolve to boolean
   */
  async canReadOrg(org, user) {
    let searchKey = this._createRedisKey(org, user, '*');
    let keys = await this.client.keys(searchKey);

    for( var i = 0; i < keys.length; i++ ) {
      let role = keys[i].split('-').pop();
      if( this.READ_ROLES[role] ) return true;
    }

    return false;
  }

  /**
   * @method _createRedisKey
   * @description create a key for org, user and role
   * 
   * @param {String} org
   * @param {String} user
   * @param {String} role
   * 
   * @returns {String}
   */
  _createRedisKey(org, user, role) {
    return `${this.REDIS_AUTH_PREFIX}-${org}-${user}-${role}`;
  }

  _createOrgRedisKey(orgName) {
    return `${this.REDIS_ORG_PREFIX}-${orgName}`;
  }

}

module.exports = new AuthModel();