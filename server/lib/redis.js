const config = require('../config');
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

    this.client = redis.createClient({host: config.redis});

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
  createAuthKey(org, user, role) {
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


}

module.exports = new Redis();