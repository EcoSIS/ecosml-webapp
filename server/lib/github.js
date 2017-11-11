const config = require('./config');
const request = require('request');

const ORG = config.github.org;
const API_ROOT = 'https://api.github.com';
const ACCEPT_MIME_TYPE = 'application/vnd.github.v3+json'
const GITHUB_ACCESS = config.github.access;

class GithubApi {
  
  /**
   * Can use app account here
   */
  async listRepositories() {
    return await this.request({
      uri : `/orgs/${ORG}/repos`
    });
  }

  /**
   * @method createRepository
   * @description Requires admin.
   * https://developer.github.com/v3/repos/#create
   */
  async createRepository(repo) {
    return await this.request({
      method : 'POST',
      uri : `/orgs/${ORG}/repos`,
      body : JSON.stringify(repo)
    });
  }

  /**
   * @method deleteRepository
   * @description Requires admin.
   * https://developer.github.com/v3/repos/#delete-a-repository
   */
  async deleteRepository(repoName) {
    return await this.request({
      method : 'DELETE',
      uri : `/repos/${ORG}/${repoName}`
    });
  }
  
  /**
   * Create a release
   * https://developer.github.com/v3/repos/releases/#create-a-release
   */
  async createRelease(repoName, release) {
    return await this.request({
      method : 'POST',
      uri : `/repos/${ORG}/${repoName}/releases`,
      body : JSON.stringify(release)
    });
  }

  /**
   * Delete a release
   * https://developer.github.com/v3/repos/releases/#delete-a-release
   */
  async deleteRelease(repoName, releaseName) {
    return await request({
      method : 'DELETE',
      uri : `/repos/${ORG}/${repoName}/releases/${releaseName}`
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
        if( error ) reject(error);
        else resolve({response, body});
      });
    });
  }
}

module.exports = new GithubApi();