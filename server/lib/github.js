const config = require('./config');
const request = require('request');
const Logger = require('./logger');
const parseLinkHeader = require('parse-link-header');

const ORG = config.github.org;
const RAW_ROOT = 'https://raw.githubusercontent.com';
const API_ROOT = 'https://api.github.com';
const ACCEPT_MIME_TYPE = 'application/vnd.github.v3+json'
const GITHUB_ACCESS = config.github.access;

class GithubApi {
  
  /**
   * @method listRepositories
   * @description get list of all repositories for org
   * https://developer.github.com/v3/repos/#list-organization-repositories
   * 
   * @returns {Promise}
   */
  async listRepositories() {
    let last = false;
    let page = 1;
    let repos = [];

    while( !last ) {
      let {response} = await this.request({
        uri : `/orgs/${ORG}/repos`,
        qs : {page}
      });

      let link = parseLinkHeader(response.headers.link) || {};
      if( !link.last ) last = true;

      let results = JSON.parse(response.body);
      if( !results.length ) last = true;
      else repos = repos.concat(results);

      page++;
    }

    return repos;
  }

  /**
   * @method createRepository
   * @description Requires admin.
   * https://developer.github.com/v3/repos/#create
   * 
   * @param {Object} repo repository information
   * 
   * @returns {Promise}
   */
  async createRepository(repo) {
    return this.request({
      method : 'POST',
      uri : `/orgs/${ORG}/repos`,
      body : JSON.stringify(repo)
    });
  }

  /**
   * @method getRepository
   * @description Requires admin.
   * https://developer.github.com/v3/repos/#get
   * 
   * @param {String} repoName repository name to get
   * 
   * @returns {Promise}
   */
  async getRepository(repoName) {
    return this.request({
      method : 'GET',
      uri : `/repos/${ORG}/${repoName}`,
    });
  }

  /**
   * @method deleteRepository
   * @description Requires admin.
   * https://developer.github.com/v3/repos/#delete-a-repository
   * 
   * @param {String} repoName repository name to delete
   * 
   * @returns {Promise}
   */
  async deleteRepository(repoName) {
    return this.request({
      method : 'DELETE',
      uri : `/repos/${ORG}/${repoName}`
    });
  }

  /**
   * @method editRepository
   * @description Requires admin.
   * https://developer.github.com/v3/repos/#edit
   * 
   * @param {Object} repo repository updates, must include name
   * @param {String} repo.name repository name to update
   * 
   * @returns {Promise}
   */
  async editRepository(repo) {
    return this.request({
      method : 'PATCH',
      uri : `/repos/${ORG}/${repo.name}`,
      body : JSON.stringify(repo)
    });
  }
  
  /**
   * @method createRelease
   * @description Create a release
   * https://developer.github.com/v3/repos/releases/#create-a-release
   * 
   * ex:
   * {
   *  "tag_name": "v1.0.0",
   *  "target_commitish": "master",
   *  "name": "v1.0.0",
   *  "body": "Description of the release",
   *  "draft": false,
   *  "prerelease": false
   * }
   * 
   * @param {String} repoName repository name
   * @param {Object} release
   * @param {String} release.tag_name
   * @param {String} release.target_commitish
   * @param {String} release.name
   * @param {String} release.body
   * @param {Boolean} release.draft
   * @param {Boolean} release.prerelease
   * 
   * @returns {Promise}
   */
  async createRelease(repoName, release) {
    return this.request({
      method : 'POST',
      uri : `/repos/${ORG}/${repoName}/releases`,
      body : JSON.stringify(release)
    });
  }

  /**
   * @method listReleases
   * @description List all releases
   * https://developer.github.com/v3/repos/releases/#list-releases-for-a-repository
   *
   * @param {String} repoName repository name
   * 
   * @returns {Promise}
   */
  async listReleases(repoName) {
    return this.request({
      method : 'GET',
      uri : `/repos/${ORG}/${repoName}/releases`
    });
  }

  /**
   * @method deleteRelease
   * @description Delete a release
   * https://developer.github.com/v3/repos/releases/#delete-a-release
   *
   * @param {String} repoName repository name
   * @param {Number} releaseId GitHub release id
   * 
   * @returns {Promise}
   */
  async deleteRelease(repoName, releaseId) {
    return this.request({
      method : 'DELETE',
      uri : `/repos/${ORG}/${repoName}/releases/${releaseId}`
    });
  }

  /**
   * @method getRawFile
   * @description download a file directly from github repo
   * 
   * @param {String} repoName name of repository
   * @param {String} filePath full path to file in repo
   * @param {String} branch optional. defaults to 'master'
   * 
   * @returns {Promise} resolves to http response
   */
  getRawFile(repoName, filePath, branch = 'master') {
    let options = {
      uri : `${RAW_ROOT}/${ORG}/${repoName}/${branch}/${filePath}`,
      headers : {
        'User-Agent' : 'EcoSML Webapp'
      }
    }

    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if( error ) return reject(error);
        Logger.info(`Raw GitHub request: ${options.method || 'GET'} ${options.uri}`);
        resolve({response, body});
      });
    });
  }

  /**
   * TODO: watch rate limiting. headers:
   * 
   * 'x-ratelimit-limit': '5000',
   * 'x-ratelimit-remaining': '4994',
   * 'x-ratelimit-reset': '1509229188',
   */
  request(options) {
    options.uri = `${API_ROOT}${options.uri}`;
  
    // set access clientId/clientSecret
    // if( !options.qs ) options.qs = {};
    // options.qs.client_id = GITHUB_ACCESS.clientId;
    // options.qs.client_secret = GITHUB_ACCESS.clientSecret;
  
    // set admin authentication
    options.auth = {
      user: GITHUB_ACCESS.username,
      pass: GITHUB_ACCESS.token,
    }
  
    // set the API version
    if( !options.headers ) options.headers = {}
    options.headers.Accept = ACCEPT_MIME_TYPE;
    options.headers['User-Agent'] = 'EcoSML Webapp';
  
    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if( error ) {
          Logger.error(`GitHub API request error: ${options.method || 'GET'} ${options.uri}`, error);
          return reject(error);
        }
        Logger.info(`GitHub API request: ${options.method || 'GET'} ${options.uri}, request remaining: ${response.headers['x-ratelimit-remaining']}`);
        resolve({response, body});
      });
    });
  }
}

module.exports = new GithubApi();