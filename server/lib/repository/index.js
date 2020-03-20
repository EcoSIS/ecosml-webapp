const github = require('./github');
const gitlab = require('./gitlab');
const config = require('../config');

class Repository {

  constructor() {
    this.HOSTS = {
      GITLAB : 'gitlab',
      GITHUB : 'github'
    }
  }

  /**
   * @method getHost
   * @description get full host with protocol for host name
   * 
   * @param {String} host package host, should not include protocol
   * 
   * @returns {String}
   */
  getHost(host) {
    if( host === this.HOSTS.GITHUB ) {
      return config.github.host;
    } else if ( host === this.HOSTS.GITLAB ) {
      return config.gitlab.host;
    }
    throw new Error('Unknown host: '+host);
  }

  /**
   * @method isRepoNameAvailable
   * @description does a repository exist
   * 
   * @param {String} host package host, should not include protocol
   * @param {String} packageName package name
   * @param {String} org Optional.  Defaults to EcoSML
   * 
   * @returns {Promise} resolves to Boolean
   */
  async exists(host, packageName, org='ecosml') {
    if( host === this.HOSTS.GITHUB ) {
      return !(await github.isRepoNameAvailable(packageName, org));
    } else if ( host === this.HOSTS.GITLAB ) {
      return gitlab.exists(packageName, org);
    }
    throw new Error('Unknown host: '+host);
  }

}

module.exports = new Repository();