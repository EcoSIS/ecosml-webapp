const ckan = require('../lib/ckan');
const config = require('../lib/config');
const Logger = require('../lib/logger');
const redis = require('redis');
const request = require('request');
const mongo = require('../lib/mongo');
const {promisify} = require('util');

const redisMethods = ['get', 'del', 'keys', 'set', 'exists', 'flushdb'];

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
   * @method login
   * @description login via EcoSIS
   * 
   * @param {String} username
   * @param {String} password
   * 
   * @returns {Promise}
   */
  login(username, password) {
    return ckan.login(username, password);
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
    let keys = await this.client.keys(`${this.REDIS_ORG_PREFIX}-*`);
    keys = keys.concat(await this.client.keys(`${this.REDIS_AUTH_PREFIX}-*`));
    for( var i = 0; i < keys.length; i++ ) {
      await this.client.del(keys[i]);
    }

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
        let data = {
          org : org.name, 
          user : users[j].username,
          role : users[j].role
        }
        await this.client.set(key, JSON.stringify(data));
      }
    }
  }
  
  async reloadOrg(orgName) {
    // grab org from ecosis
    let org = await ckan.getOrganization(orgName);
    if( !org ) return;

    // remove org keys
    await this.client.del(this._createOrgRedisKey(orgName));
    // find role keys to remove
    let searchKey = this._createRedisKey(org, '*', '*');
    let keys = await this.client.keys(searchKey);
    for( let i = 0; i < keys.length; i++ ) {
      await this.client.del(keys[i]);
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
    await this.client.set(this._createOrgRedisKey(org.name), JSON.stringify(org));

    // add user roles
    for( let j = 0; j < users.length; j++ ) {
      let key = this._createRedisKey(org.name, users[j].name, users[j].capacity);
      let data = {
        org : org.name, 
        user : users[j].username,
        role : users[j].capacity
      }
      await this.client.set(key, JSON.stringify(data));
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
   * @method getUserOrgs
   * @description get orgs for a user
   * 
   * @param {String} username name of user to get groups for
   * @param {Boolean} details include org details?
   * 
   * @return {Promise} resolves to Array
   */
  async getUserOrgs(username) {
    let orgs = {};
    let keys;

    let isAdmin = await this.isAdmin(username);
    if( isAdmin ) {
      let searchKey = this._createOrgRedisKey('*');
      keys = await this.client.keys(searchKey);

      for( var i = 0; i < keys.length; i++ ) {
        let org = JSON.parse(await this.client.get(keys[i]));
        resp.push({
          roles : ['admin', 'site-admin'],
          name : org.name,
          id : org.id,
          displayName : org.displayName
        });
      }

      return orgs;
    }

    let searchKey = this._createRedisKey('*', username, '*');
    keys = await this.client.keys(searchKey);

    for( var i = 0; i < keys.length; i++ ) {
      let key = JSON.parse(await this.client.get(keys[i]));
      if( orgs[key.org] ) orgs[key.org].push(key.role);
      else orgs[key.org] = [key.role];
    }

    let resp = [];
    keys = Object.keys(orgs);

    for( var i = 0; i < keys.length; i++ ) {
      let key = this._createOrgRedisKey(keys[i]);
      let org = JSON.parse(await this.client.get(key));

      resp.push({
        roles : orgs[org.name],
        name : org.name,
        id : org.id,
        displayName : org.displayName
      });
    }

    return resp;
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

  _request(options) {
    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if( error ) {
          Logger.error(`AuthModel request error: ${options.method || 'GET'} ${options.uri}`, error);
          return reject(error);
        }
        Logger.info(`AuthModel request: ${options.method || 'GET'} ${options.uri}`);
        resolve({response, body});
      });
    });
  }

}

module.exports = new AuthModel();