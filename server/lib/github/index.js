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
    return await request({
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
    return await request({
      method : 'DELETE',
      uri : `/repos/${ORG}/${repoName}`
    });
  }
  
  /**
   * Create a release
   * https://developer.github.com/v3/repos/releases/#create-a-release
   */
  async createRelease(repoName, release) {
    return await request({
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

}

module.exports = new GithubApi();