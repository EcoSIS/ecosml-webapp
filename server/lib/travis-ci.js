const config = require('./config');
const request = require('request');
const Logger = require('./logger');

// const ORG = config.github.org;
const ORG = config.github.org;
const OWNER = config.github.access.username;
const API_ROOT = 'https://api.travis-ci.org/v3';


class TravisCi {

  /**
   * @method listRepositories
   * @description https://developer.travis-ci.org/resource/repositories#Repositories
   * 
   * @param {String} repoName repository name to get
   * 
   * @returns {Promise}
   */
  listRepositories(options = {}) {
    let owner = options.owner || ORG;

    return this.request({
      method : 'GET',
      uri : `/owner/${owner}/repos`
    });
  }

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
   * @method activateRepository
   * @description https://developer.travis-ci.org/resource/repository#activate
   * 
   * @param {String} repoName repository name to get
   * @param {Boolean} activate set repository to active
   * 
   * @returns {Promise}
   */
  activateRepository(repoName, activate=true) {
    let id = encodeURIComponent(`${ORG}/${repoName}`);
    let action = activate ? 'activate' : 'deactivate';

    return this.request({
      method : 'POST',
      uri : `/repo/${id}/${action}`
    });
  }

  /**
   * @method setRepositorySettings
   * @description https://developer.travis-ci.org/resource/setting#Setting
   * 
   * builds_only_with_travis_yml (boolean)
   * build_pushes (boolean)
   * build_pull_requests (boolean)
   * maximum_number_of_builds (integer)
   * auto_cancel_pushes (boolean)
   * auto_cancel_pull_requests (boolean)
   * 
   * @param {String} repoName repository name to get
   * @param {Boolean} settingName
   * @param {Boolean|Number} settingValue 
   * 
   * @returns {Promise}
   */
  setRepositorySettings(repoName, settingName, settingValue) {    
    let id = encodeURIComponent(`${ORG}/${repoName}`);
    
    return this.request({
      method : 'PATCH',
      uri : `/repo/${id}/setting/${settingName}`,
      body : JSON.stringify({
        'setting.value' : settingValue
      }),
      headers : {
        'Content-Type': 'application/json'
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
   * Verifying webhook request:
   * https://docs.travis-ci.com/user/notifications/#Verifying-Webhook-requests
   * 
   * @param {String} repoName
   * 
   * @returns {Promise}
   */
  requestBuild(repoName, options = {}) {
    let id = encodeURIComponent(`${options.org||ORG}/${repoName}`);

    if( !options.config ) options.config = {};
    if( !options.config.notifications ) options.config.notifications = {};
    if( !options.config.notifications.webhooks ) {
      options.config.notifications.webhooks = config.cloudFunctions.baseUrls.travisBuild + 
                                              config.cloudFunctions.envs[config.firebase.env];
    }
    console.log(options.config);

    Logger.info(`Request repository ${id} ci testing with webhook: ${options.config.notifications.webhooks}`);

    return this.request({
      method : 'POST',
      uri : `/repo/${id}/requests`,
      body : JSON.stringify({
        request : {
          branch : options.branch || 'master',
          message : options.message || 'EcoSML webapp triggered build',
          config : options.config || ''
        }
      }),
      headers : {
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * @method syncRepositories
   * @description https://developer.travis-ci.org/resource/user#sync
   * 
   * @param {String} repoName
   * 
   * @returns {Promise}
   */
  syncRepositories(username) {
    return this.request({
      method : 'POST',
      uri : `/user/${username||ORG}/sync`
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
        
        resolve(response);
      });
    });
  }

}

module.exports = new TravisCi();