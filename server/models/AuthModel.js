const ckan = require('../lib/ckan');
const config = require('../lib/config');
const Logger = require('../lib/logger');
const redis = require('../lib/redis');
const request = require('request');
const mongo = require('../lib/mongo');
const github = require('../lib/github');
const mongodb = require('../lib/mongo');

class AuthModel {

  constructor() {    
    this.READ_ROLES = {
      member : true
    };

    this.WRITE_ROLES = {
      admin : true,
      editor : true
    };
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
  async login(username, password) {
    let result = await ckan.login(username, password);

    // make sure latest data is sync'd
    if( result.githubUsername ) {
      // save to redis
      let key = redis.createUserGithubKey(ecosisUsername);
      await redis.client.set(key, JSON.stringify({
        username: result.githubUsername,
        data : result.data,
        accessToken : result.githubAccessToken
      }));
    }

    return result;
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
  isAdmin(username) {
    return redis.client.exists(`${config.redis.prefixes.admin}-${username}`);
  }

  /**
   * @method setAdmin
   * @description Set site admin
   * 
   * @param {String} username user you want to set
   * 
   * @returns {Promise} resolve to boolean
   */
  setAdmin(username) {
    return redis.client.set(`${config.redis.prefixes.admin}-${username}`, true);
  }

  /**
   * @method removeAdmin
   * @description Remove site admin
   * 
   * @param {String} username user you want to remove
   * 
   * @returns {Promise} resolve to boolean
   */
  removeAdmin(username) {
    return redis.client.del(`${config.redis.prefixes.admin}-${username}`);
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
    let searchKey = redis.createAuthKey(org, user, '*');
    let keys = await redis.client.keys(searchKey);

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
    let searchKey = redis.createAuthKey(org, user, '*');
    let keys = await redis.client.keys(searchKey);

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
    let resp = [];
    let keys;

    let isAdmin = await this.isAdmin(username);
    if( isAdmin ) {
      let searchKey = redis.createOrgKey('*');
      keys = await redis.client.keys(searchKey);

      for( var i = 0; i < keys.length; i++ ) {
        let org = JSON.parse(await redis.client.get(keys[i]));
        resp.push({
          roles : ['admin', 'site-admin'],
          name : org.name,
          id : org.id,
          displayName : org.displayName
        });
      }

      return resp;
    }

    let searchKey = redis.createAuthKey('*', username, '*');
    keys = await redis.client.keys(searchKey);

    for( var i = 0; i < keys.length; i++ ) {
      let key = JSON.parse(await redis.client.get(keys[i]));
      if( orgs[key.org] ) orgs[key.org].push(key.role);
      else orgs[key.org] = [key.role];
    }

    resp = [];
    keys = Object.keys(orgs);

    for( var i = 0; i < keys.length; i++ ) {
      let key = redis.createOrgKey(keys[i]);
      let org = JSON.parse(await redis.client.get(key));

      resp.push({
        roles : orgs[org.name],
        name : org.name,
        id : org.id,
        displayName : org.displayName
      });
    }

    return resp;
  }

  async getOrgs() {
    let orgs = [];
    let searchKey = redis.createOrgKey('*');
    let keys = await redis.client.keys(searchKey);

    for( var i = 0; i < keys.length; i++ ) {
      let org = JSON.parse(await redis.client.get(keys[i]));
      orgs.push(org);
    }

    return orgs;
  }

  /**
   * @method linkGithubUsername
   * @description link github and ecosis user accounts by adding
   * 
   * @param {String} ecosisUsername 
   * @param {String} githubUsername 
   * @param {String} githubAccessToken
   */
  async linkGithubUsername(ecosisUsername, githubUser, githubAccessToken) {
    let data = {
      avatarUrl : githubUser.avatar_url
    };
    
    // save to ckan so we can restore
    await ckan.setGithubInfo(
      ecosisUsername, 
      githubUser.login,
      data,
      githubAccessToken
    );

    // save to redis
    let key = redis.createUserGithubKey(ecosisUsername);
    await redis.client.set(key, JSON.stringify({
      username: githubUser.login,
      data,
      accessToken : githubAccessToken
    }));

    let orgs = (await this.getUserOrgs(ecosisUsername) || []);
    for( let org of orgs ) {
      let team = await mongodb.getGithubTeam(org.name);
      await github.addTeamMember(team.id, ecosisUsername);
    }
  }

  /**
   * @method unlinkGithubUsername
   * @description revoke user access token to github.  There is a change the user already revoked
   * token and stored token is out of date.  In this case a redirect object will be returned with
   * a url so the user can unlink
   * 
   * @param {String} ecosisUsername EcoSIS Username
   * 
   * @returns {Object} or null
   */
  async unlinkGithubUsername(ecosisUsername) {
    let key = redis.createUserGithubKey(ecosisUsername);

    let githubInfo = await redis.client.get(key);
    if( !githubInfo ) return;
    githubInfo = JSON.parse(githubInfo);

    // revoke token form github
    let {response} = await github.revokeOauthAccessToken(githubInfo.accessToken);
    
    let redirect;
    if( response.statusCode === 404 ) {
      redirect = {
        message : 'Invalid token stored',
        url : `https://github.com/settings/connections/applications/${config.github.clientId}`
      }
    } else if( response.statusCode !== 204 ) {
      throw new Error(`Unable to revoke access token: ${response.statusCode} ${response.body}`);
    }

    await this.removeGithubUserAccess(ecosisUsername);
   
    return redirect;
  }

  async removeGithubUserAccess(ecosisUsername) {
    let key = redis.createUserGithubKey(ecosisUsername);

    // save to ckan
    await ckan.setGithubInfo(ecosisUsername, '', {}, '');

    // update to redis
    await redis.client.del(key);

    let orgs = (await this.getUserOrgs(ecosisUsername) || []);
    for( let org of orgs ) {
      let team = await mongodb.getGithubTeam(org.name);
      github.removeTeamMember(team.id, ecosisUsername);
    }
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