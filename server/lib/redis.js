const config = require('./config');
const redis = require('redis');
const {promisify} = require('util');

const redisMethods = ['get', 'del', 'keys', 'set', 'exists', 'flushdb'];

class Redis {

  constructor() {    
    this.READ_ROLES = {
      member : true
    };

    this.WRITE_ROLES = {
      admin : true,
      editor : true
    };

    this.client = redis.createClient({host: config.redis.host});

    redisMethods.forEach(method => {
      this.client[method] = promisify(this.client[method]).bind(this.client)
    });
  }

  /**
   * @method createAuthKey
   * @description create a auth key for org, user and role
   * 
   * @param {String} org
   * @param {String} user
   * @param {String} role
   * 
   * @returns {String}
   */
  createAuthKey(org='*', user='*', role='*') {
    return `${config.redis.prefixes.auth}-${org}-${user}-${role}`;
  }

  /**
   * @method createOrgKey
   * @description create an org key
   * 
   * @param {String} orgName
   * 
   * @returns {Promise} 
   */
  createOrgKey(orgName) {
    return `${config.redis.prefixes.org}-${orgName}`;
  }

  /**
   * @method getOrgNameFromId
   * @description given an EcoSIS org id, find the org.  Note this is not 
   * the most efficient method, but this is only required for delete (which
   * shouldn't happen very often) where we only have the id of an org from
   * EcoSIS.
   * 
   * @param {String} orgId ecosis organization id
   * 
   * @returns {Promise} resolves to string or null
   */
  async getOrgNameFromId(orgId) {
    let keys = await this.client.keys(this.createOrgKey('*'));
    for( var i = 0; i < keys.length; i++ ) {
      let org = JSON.parse(await this.client.get(keys[i]));
      if( org.id === orgId ) return org.name;
    }
    return null;
  }

  /**
   * @method getOrgDisplayNameFromName
   * @description given then org short name, return the org display name
   * 
   * @return {Promise} resolves to String
   */
  async getOrgDisplayNameFromName(orgName) {
    let result = await this.client.get(this.createOrgKey(orgName));
    if( !result ) return '';
    return JSON.parse(result).displayName;
  }


}

module.exports = new Redis();