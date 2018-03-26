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
  getRepository(repoName) {
    return this.request({
      method : 'GET',
      uri : `/repo/${repoName}`
    });
  }


  request(options) {
    options.uri = `${API_ROOT}${options.uri}`;
  
    // set the API version
    if( !options.headers ) options.headers = {}
    options.headers['Authorization'] = `token ${config.travisCi.token}`;
    options.headers['Travis-API-Version'] = 3;
    options.headers['User-Agent'] = 'EcoSML Webapp';
  
    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if( error ) {
          Logger.error(`TravisCi API request error: ${options.method || 'GET'} ${options.uri}`, error);
          return reject(error);
        }
        Logger.info(`TravisCi API request: ${options.method || 'GET'} ${options.uri}`);
        
        resolve({response, body});
      });
    });
  }

}

module.exports = new TravisCi();