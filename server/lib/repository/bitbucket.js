const fetch = require('node-fetch');
const config = require('../config');
const utils = require('../utils');
const {JSDOM} = require('jsdom');
const logger = require('../logger');

class Bitbucket {

  /**
   * @method exists
   * @description check is a respository exits.  This method uses
   * a HEAD request to the repo root page so it does not burn up a API request.
   * 
   * @param {String} name repository name to check
   * @param {String} org Optional.
   * 
   * @returns {Promise} resolves to {Boolean}
   */
  async exists(name, org) {
    let resp = await fetch(
      config.bitbucket.host+'/'+org+'/'+name,
      {
        method: 'HEAD',
        redirect : 'manual'
      }
    );
    return resp.status === 200;
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
    let {response, body} = await this.getRawFile(repoName, 'README.md');
    if( response.ok ) return body;
    
    ({response, body} = await this.getRawFile(repoName, 'README'));
    if( response.ok ) return body;

    return '';
  }

  /**
   * @method getRawFile
   * @description download a file directly from bitbucket repo
   * 
   * @param {String} repoName name of repository
   * @param {String} filePath full path to file in repo
   * @param {String} branch optional. defaults to 'master'
   * 
   * @returns {Promise} resolves to http response
   */
  async getRawFile(repoName, filePath, branch = 'master') {
    var {repoName, org} = utils.getRepoNameAndOrg(repoName);

    let uri = `${config.bitbucket.host}/${org}/${repoName}/raw/${branch}/${filePath}`;
    let response = await fetch(
      uri,
      {'User-Agent' : 'EcoSML Webapp'}
    );

    logger.info(`Raw GitLab request: GET ${uri}`);
    return {response, body: await response.text()};
  }

  /**
   * @method overview
   * @description extract overview description of a repository
   * 
   * @param {*} repoName 
   */
  async overview(repoName) {
    var {repoName, org} = utils.getRepoNameAndOrg(repoName);

    let response = await fetch(`${config.bitbucket.host}/${org}/${repoName}`);

    if( response.status !== 200 ) {
      throw new Error(`Unknown repository: ${org}/${repoName}`)
    }

    const dom = new JSDOM(await response.text(), {runScripts: "dangerously"});
    try {
      return dom.window.__initial_state__.section.repository.currentRepository.description;
    } catch(e) {
      logger.error('Failed to parse bitbucket description', e);
    }

    return '';
  }

  async latestRelease(repoName) {
    let fullRepoName = repoName;
    var {repoName, org} = utils.getRepoNameAndOrg(repoName);

    let response = await fetch(
      `${config.bitbucket.host}/!api/2.0/repositories/${org}/${repoName}/refs/tags?pagelen=50&sort=-target.date`,
    );

    if( response.status !== 200 ) {
      throw new Error(`Unknown repository: ${org}/${repoName}`)
    }

    let tag = (await response.json()).values[0];
    return {
      body : '',
      htmlUrl: tag.links.html.href,
      name : tag.name,
      tagName : tag.name,
      tarballUrl : this.getReleaseSnapshotUrl(fullRepoName, tag.name, 'tar.gz'),
      zipballUrl: this.getReleaseSnapshotUrl(fullRepoName, tag.name, 'zip')
    }
  }

  getReleaseSnapshotUrl(repoName, tag, type='zip') {
    var {repoName, org} = utils.getRepoNameAndOrg(repoName);
    return `${config.bitbucket.host}/${org}/${repoName}/get/${tag}.${type}`;
  }

}

module.exports = new Bitbucket();