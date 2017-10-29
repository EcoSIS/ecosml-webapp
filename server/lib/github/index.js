const config = require('../config');
const request = require('./request');
const ORG = config.github.org;

class GithubApi {
  
  /**
   * Can use app account here
   */
  async listRepositories() {
    return await request({
      uri : `/orgs/${ORG}/repos`
    });
  }

  /**
   * @method createRepository
   * @description Requires admin.
   * https://developer.github.com/v3/repos/#create
   */
  async createRepository(repo) {
    try {
      return await request({
        method : 'POST',
        uri : `/orgs/${ORG}/repos`,
        body : JSON.stringify(repo)
      });
    } catch(e) {
      throw e;
    }
  }

  /**
   * @method deleteRepository
   * @description Requires admin.
   * https://developer.github.com/v3/repos/#delete-a-repository
   */
  async deleteRepository(repoName) {
    try {
      return await request({
        method : 'DELETE',
        uri : `/repos/${ORG}/${repoName}`
      });
    } catch(e) {
      throw e;
    }
  }
  
  /**
   * Create a release
   * https://developer.github.com/v3/repos/releases/#create-a-release
   */
  async createRelease(repoName, release) {
    try {
      return await request({
        method : 'POST',
        uri : `/repos/${ORG}/${repoName}/releases`,
        body : JSON.stringify(release)
      });
    } catch(e) {
      throw e;
    }
  }

  /**
   * Delete a release
   * https://developer.github.com/v3/repos/releases/#delete-a-release
   */
  async deleteRelease(repoName, releaseName) {
    try {
      return await request({
        method : 'DELETE',
        uri : `/repos/${ORG}/${repoName}/releases/${releaseName}`
      });
    } catch(e) {
      throw e;
    }
  }

}

module.exports = new GithubApi();