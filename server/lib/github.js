const config = require('./config');
const request = require('request');
const Logger = require('./logger');
const utils = require('./utils');
const {JSDOM} = require('jsdom');
const parseLinkHeader = require('parse-link-header');

const ORG = config.github.org;
const RAW_ROOT = 'https://raw.githubusercontent.com';
const API_ROOT = 'https://api.github.com';
const ACCEPT_MIME_TYPE = 'application/vnd.github.v3+json'
const GITHUB_ACCESS = config.github.access;

class GithubApi {

  /**
   * @method isRepoNameAvailable
   * @description check is a respository name is available.  This method uses
   * a HEAD request to the repo root page so it does not burn up a API request.
   * 
   * @param {String} name repository name to check
   * 
   * @returns {Promise} resolves to {Boolean}
   */
  isRepoNameAvailable(name) {
    return new Promise((resolve, reject) => {
      request({
        uri : `https://github.com/${ORG}/${name}`,
        method : 'HEAD'
      }, (error, response) => {
        if( error ) reject(error);
        else resolve(response.statusCode === 200 ? false : true)
      });
    });
  }
  
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
   * @method latestRelease
   * @description return the latest release tag name.  Note, this
   * call does not burn a API request.
   * 
   * @param {String} repoName 
   * 
   * @returns {Promise} resolves to null or string
   */
  async latestRelease(repoName) {
    var {repoName, org} = utils.getRepoNameAndOrg(repoName);

    let {response} = await this.requestRaw({
      uri : `https://github.com/${org}/${repoName}/releases/latest`,
      followRedirect : false
    });

    if( response.statusCode !== 302 ) {
      throw new Error(`Unknown repository: ${org}/${repoName}`)
    }

    let url = response.headers.location.replace(/.*releases\/?/, '');
    if( !url ) return null;

    let tag = url.replace(/.*tag\//, '');
    return {
      body : '',
      htmlUrl: `https://github.com/${org}/${repoName}/releases/tag/${tag}`,
      name : tag,
      tagName : tag,
      tarballUrl : `https://api.github.com/repos/${org}/${repoName}/tarball/${tag}`,
      zipballUrl: `https://api.github.com/repos/${org}/${repoName}/zipball/${tag}`
    }
  }

  /**
   * @method readme
   * @description load the readme text from repository.  This call
   * does not burn a API request.
   * 
   * @param {String} repoName
   * 
   * @returns {Promise} resolves to String 
   */
  async readme(repoName) {
    let {response} = await this.getRawFile(repoName, 'README.md');
    if( response.statusCode === 200 ) return response.body;
    
    ({response} = await this.getRawFile(repoName, 'README'));
    if( response.statusCode === 200 ) return response.body;

    return '';
  }

  async overview(repoName) {
    var {repoName, org} = utils.getRepoNameAndOrg(repoName);

    let {response} = await this.requestRaw({
      uri : `https://github.com/${org}/${repoName}`,
      followRedirect : false
    });

    if( response.statusCode !== 200 ) {
      throw new Error(`Unknown repository: ${org}/${repoName}`)
    }

    const dom = new JSDOM(response.body);
    let ele = dom.window.document.querySelector('[itemscope][itemtype="http://schema.org/SoftwareSourceCode"] [itemprop="about"]');
    if( !ele ) {
      Logger.error(`CSS query failed to find repo overview for: ${org}/${repoName}`);
      return '';
    } 

    return ele.innerHTML.trim();
  }

  /**
   * @method listTeams
   * @description list all teams for org
   * https://developer.github.com/v3/teams/#list-teams
   * 
   * 
   * @returns {Promise} resolves to Array
   */
  async listTeams() {
    let last = false;
    let page = 1;
    let teams = [];

    while( !last ) {
      let {response} = await this.request({
        uri : `/orgs/${ORG}/teams`,
        qs : {page}
      });

      let link = parseLinkHeader(response.headers.link) || {};
      if( !link.last ) last = true;

      let results = JSON.parse(response.body);
      if( !results.length ) last = true;
      else teams = teams.concat(results);

      page++;
    }

    return teams;
  }

  /**
   * @method getTeam
   * @description Get a team
   * https://developer.github.com/v3/teams/#get-team
   *
   * @param {String} id team id
   * 
   * @returns {Promise}
   */
  async getTeam(id) {
    return this.request({
      uri : `/teams/${id}`
    });
  }

  /**
   * @method createTeam
   * @description Create a team
   * https://developer.github.com/v3/teams/#create-team
   *
   * @param {Object} team team payload
   * 
   * @returns {Promise}
   */
  async createTeam(team) {
    return this.request({
      method : 'POST',
      uri : `/orgs/${ORG}/teams`,
      body : JSON.stringify(team)
    });
  }

  /**
   * @method editTeam
   * @description Edit a team
   * https://developer.github.com/v3/teams/#edit-team
   *
   * @param {String} id team id
   * @param {Object} team team payload
   * 
   * @returns {Promise}
   */
  async editTeam(id, team) {
    return this.request({
      method : 'PATCH',
      uri : `/teams/${id}`,
      body : JSON.stringify(team)
    });
  }

  /**
   * @method deleteTeam
   * @description Create a team
   * https://developer.github.com/v3/teams/#delete-team
   *
   * @param {String} id team id
   * 
   * @returns {Promise}
   */
  async deleteTeam(id) {
    return this.request({
      method : 'DELETE',
      uri : `/teams/${id}`
    });
  }

  /**
   * @method listTeamMembers
   * @description list all team members
   * https://developer.github.com/v3/teams/members/#list-team-members
   *
   * @param {String} id team id
   * 
   * @returns {Promise} resolves to Array
   */
  async listTeamMembers(id) {
    let last = false;
    let page = 1;
    let members = [];

    while( !last ) {
      let {response} = await this.request({
        uri : `/teams/${id}/members`,
        qs : {page}
      });

      let link = parseLinkHeader(response.headers.link) || {};
      if( !link.last ) last = true;

      let results = JSON.parse(response.body);
      if( !results.length ) last = true;
      else members = members.concat(results);

      page++;
    }

    return members;
  }

  /**
   * @method listTeamRepos
   * @description list all team repos
   * https://developer.github.com/v3/teams/#list-team-repos
   *
   * @param {String} id team id
   * 
   * @returns {Promise} resolves to Array
   */
  async listTeamRepos(id) {
    let last = false;
    let page = 1;
    let repos = [];

    while( !last ) {
      let {response} = await this.request({
        uri : `/teams/${id}/repos`,
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
   * @method addTeamRepo
   * @description add a repo to a team
   * https://developer.github.com/v3/teams/#add-or-update-team-repository
   * 
   * @param {String} id team id
   * @param {String} repo repo name 
   * 
   * @returns {Promise}
   */
  addTeamRepo(id, repo) {
    return this.request({
      method : 'PUT',
      uri : `/teams/${id}/repos/${ORG}/${repo}`,
      headers : {
        'Content-Length' : 0
      }
    });
  }

  /**
   * @method removeTeamRepo
   * @description remove a repo to a team
   * https://developer.github.com/v3/teams/#remove-team-repository
   * 
   * @param {String} id team id
   * @param {String} repo repo name 
   * 
   * @returns {Promise}
   */
  removeTeamRepo(id, repo) {
    return this.request({
      method : 'DELETE',
      uri : `/teams/${id}/repos/${ORG}/${repo}`
    });
  }

  /**
   * @method addTeamMember
   * @description Add a user to a team
   * https://developer.github.com/v3/teams/members/#add-or-update-team-membership
   *
   * @param {String} id team id
   * @param {String} username github username
   * @param {String} role github username
   * 
   * @returns {Promise}
   */
  async addTeamMember(id, username, role='member') {
    return this.request({
      method : 'PUT',
      uri : `/teams/${id}/memberships/${username}`,
      body : JSON.stringify({role})
    });
  }

  /**
   * @method removeTeamMember
   * @description Remove a user from a team
   * https://developer.github.com/v3/teams/members/#add-or-update-team-membership
   *
   * @param {String} id team id
   * @param {String} username github username
   * 
   * @returns {Promise}
   */
  async removeTeamMember(id, username) {
    return this.request({
      method : 'DELETE',
      uri : `/teams/${id}/memberships/${username}`
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
    var {repoName, org} = utils.getRepoNameAndOrg(repoName);

    let options = {
      uri : `${RAW_ROOT}/${org}/${repoName}/${branch}/${filePath}`,
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
        
        if( parseInt(response.headers['x-ratelimit-remaining']) < 500 ) {
          let time = parseInt(response.headers['x-ratelimit-reset']);
          let resets = Math.floor((time - (Date.now()/1000)) / 60);

          Logger.warn('Less that '+response.headers['x-ratelimit-remaining']+' GitHub requests remaining.  Resets in '+resets+'min');
        }

        resolve({response, body});
      });
    });
  }

  requestRaw(options) {    
    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if( error ) {
          Logger.error(`GitHub request error: ${options.method || 'GET'} ${options.uri}`, error);
          return reject(error);
        }
        Logger.info(`GitHub request: ${options.method || 'GET'} ${options.uri}`);
        resolve({response, body});
      });
    });
  }
}

module.exports = new GithubApi();