const config = require('./config');
const request = require('request');
const Logger = require('./logger');

// const ORG = config.github.org;
const ORG = config.github.org;
const API_ROOT = 'https://api.travis-ci.org/v3';

class TravisCi {

  /**
   * @method getRepository
   * @description https://developer.travis-ci.org/resource/repository#Repository
   * 
   * @param {String} repoName repository name to get
   * 
   * @returns {Promise}
   */
  getRepository(repoName, org) {
    let id = encodeURIComponent(`${org||ORG}/${repoName}`);

    return this.request({
      method : 'GET',
      uri : `/repo/${id}`
    });
  }

  /**
   * @method getRepositoryBuilds
   * @description https://developer.travis-ci.org/resource/builds#Builds
   * 
   * @param {String} repoName repository name to get
   * 
   * @returns {Promise}
   */
  getRepositoryBuilds(repoName, options = {}) {
    let id = encodeURIComponent(`${options.org||ORG}/${repoName}`);

    return this.request({
      method : 'GET',
      uri : `/repo/${id}/builds`,
      qs : {
        limit : options.limit || 10
      }
    });
  }

  /**
   * @method requestBuild
   * @description https://developer.travis-ci.org/resource/requests#Requests
   * 
   * Setting webhook notifications:
   * https://docs.travis-ci.com/user/notifications/#Configuring-webhook-notifications
   * 
   * @param {String} repoName
   * 
   * @returns {Promise}
   */
  requestBuild(repoName, options = {}) {
    let id = encodeURIComponent(`${options.org||ORG}/${repoName}`);

    return this.request({
      method : 'POST',
      uri : `/repo/${id}/requests`,
      body : JSON.stringify({
        request : {
          branch : options.branch || 'master',
          message : options.message || 'EcoSML webapp triggered build'
        }
      })
    });
  }

  request(options) {
    options.uri = `${API_ROOT}${options.uri}`;
  
    // set the API version
    if( !options.headers ) options.headers = {}
    options.headers['Authorization'] = `token ${config.travisCi.token}`;
    options.headers['Travis-API-Version'] = 3;
    options.headers['User-Agent'] = 'EcoSML Webapp';
  
    console.log(options);

    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if( error ) {
          Logger.error(`TravisCi API request error: ${options.method || 'GET'} ${options.uri}`, error);
          return reject(error);
        }
        Logger.info(`TravisCi API request: ${options.method || 'GET'} ${options.uri}`);
        
        resolve(response);
      });
    });
  }

}

module.exports = new TravisCi();