const fetch = require('node-fetch');
const config = require('../config');
const utils = require('../utils');
const {JSDOM} = require('jsdom');
const logger = require('../logger');

class Gitlab {

  constructor() {

  }

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
      config.gitlab.host+'/'+org+'/'+name,
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
   * @description download a file directly from github repo
   * 
   * @param {String} repoName name of repository
   * @param {String} filePath full path to file in repo
   * @param {String} branch optional. defaults to 'master'
   * 
   * @returns {Promise} resolves to http response
   */
  async getRawFile(repoName, filePath, branch = 'master') {
    var {repoName, org} = utils.getRepoNameAndOrg(repoName);

    let uri = `${config.gitlab.host}/${org}/${repoName}/-/raw/${branch}/${filePath}`;
    let response = await fetch(
      uri,
      {'User-Agent' : 'EcoSML Webapp'}
    );

    logger.info(`Raw GitLab request: GET ${uri}`);
    return {response, body: await response.text()};
  }

  async overview(repoName) {
    var {repoName, org} = utils.getRepoNameAndOrg(repoName);

    let response = await fetch(`${config.gitlab.host}/${org}/${repoName}`);

    if( response.status !== 200 ) {
      throw new Error(`Unknown repository: ${org}/${repoName}`)
    }

    const dom = new JSDOM(await response.text());
    let ele = dom.window.document.querySelector('.home-panel-description-markdown p');
    if( !ele ) {
      logger.error(`CSS query failed to find gitlab repo overview for: ${org}/${repoName}`);
      return '';
    } 

    return ele.innerHTML.trim();
  }

    /**
   * @method latestRelease
   * @description return the latest release tag name.  Note, this
   * call does not burn a API request.
   * 
   * @param {String} repoName 
   * 
   * @returns {Promise} resolves to null or tag object
   */
  async latestRelease(repoName) {
    let fullRepoName = repoName;
    var {repoName, org} = utils.getRepoNameAndOrg(repoName);

    let response = await fetch(
      `${config.gitlab.host}/${org}/${repoName}/-/tags`,
      {redirect : 'manual'}
    );

    if( response.status !== 200 ) {
      throw new Error(`Unknown repository: ${org}/${repoName}`)
    }

    const dom = new JSDOM(await response.text());
    let ele = dom.window.document.querySelector('.content-list li:first-child .item-title');
    if( !ele ) {
      logger.error(`CSS query failed to find gitlab repo overview for: ${org}/${repoName}`);
      return '';
    }

    let tag = ele.innerHTML;
    return {
      body : '',
      htmlUrl: ele.getAttribute('href'),
      name : tag,
      tagName : tag,
      tarballUrl : this.getReleaseSnapshotUrl(fullRepoName, tag, 'tar'),
      zipballUrl: this.getReleaseSnapshotUrl(fullRepoName, tag, 'zip')
    }
  }

  getReleaseSnapshotUrl(repoName, tag, type='zip') {
    var {repoName, org} = utils.getRepoNameAndOrg(repoName);
    return `https://gitlab.com/${org}/${repoName}/-/archive/${tag}/${repoName}-${tag}.${type}`;
  }

}

module.exports = new Gitlab();