const fetch = require('node-fetch');
const request = require('request');
const config = require('../config');
const {JSDOM} = require('jsdom');
const logger = require('../logger');
const fs = require('fs');
const path = require('path');

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
   * @param {String} repoOrg
   * @param {String} repoName
   * 
   * @returns {Promise} resolves to String 
   */
  async readme(repoOrg, repoName) {
    let {response, body} = await this.getRawFile(repoOrg, repoName, 'README.md');
    if( response.ok ) return body;
    
    ({response, body} = await this.getRawFile(repoOrg, repoName, 'README'));
    if( response.ok ) return body;

    return '';
  }

  /**
   * @method getRawFile
   * @description download a file directly from gitlab repo
   * 
   * @param {String} repoOrg
   * @param {String} repoName name of repository
   * @param {String} filePath full path to file in repo
   * @param {String} branch optional. defaults to 'master'
   * 
   * @returns {Promise} resolves to http response
   */
  async getRawFile(repoOrg, repoName, filePath, branch = 'master') {
    let uri = `${config.gitlab.host}/${repoOrg}/${repoName}/-/raw/${branch}/${filePath}`;
    let response = await fetch(
      uri,
      {'User-Agent' : 'EcoSML Webapp'}
    );

    logger.info(`Raw GitLab request: GET ${uri}`);
    return {response, body: await response.text()};
  }

  async overview(repoOrg, repoName) {
    let response = await fetch(`${config.gitlab.host}/${repoOrg}/${repoName}`);

    if( response.status !== 200 ) {
      throw new Error(`Unknown repository: ${repoOrg}/${repoName}`)
    }

    const dom = new JSDOM(await response.text());
    let ele = dom.window.document.querySelector('.home-panel-description-markdown p');
    if( !ele ) {
      logger.error(`CSS query failed to find gitlab repo overview for: ${repoOrg}/${repoName}`);
      return '';
    } 

    return ele.innerHTML.trim();
  }

    /**
   * @method latestRelease
   * @description return the latest release tag name.  Note, this
   * call does not burn a API request.
   * 
   * @param {String} repoOrg
   * @param {String} repoName 
   * 
   * @returns {Promise} resolves to null or tag object
   */
  async latestRelease(repoOrg, repoName) {
    let response = await fetch(
      `${config.gitlab.host}/${repoOrg}/${repoName}/-/tags`,
      {redirect : 'manual'}
    );

    if( response.status !== 200 ) {
      throw new Error(`Unknown repository: ${repoOrg}/${repoName}`)
    }

    const dom = new JSDOM(await response.text());
    let ele = dom.window.document.querySelector('.content-list li:first-child .item-title');
    if( !ele ) {
      logger.error(`CSS query failed to find gitlab repo overview for: ${repoOrg}/${repoName}`);
      return '';
    }

    let tag = ele.innerHTML;
    return {
      body : '',
      htmlUrl: ele.getAttribute('href'),
      name : tag,
      tagName : tag,
      tarballUrl : this.getReleaseSnapshotUrl(repoOrg, repoName, tag, 'tar'),
      zipballUrl: this.getReleaseSnapshotUrl(repoOrg, repoName, tag, 'zip')
    }
  }

  getReleaseSnapshotUrl(repoOrg, repoName, tag, type='zip') {
    if( type === 'tar' || type === 'gz' ) type = 'tar.gz';
    return `https://gitlab.com/${repoOrg}/${repoName}/-/archive/${tag}/${repoName}-${tag}.${type}`;
  }

    /**
   * @method getReleaseSnapshot
   * @description download a release zip or tarball for a given repo and tag
   * 
   * @param {String} repoName name of repository, can include org in path
   * @param {String} tag tag name of release
   * @param {String} downloadPath path to download file to
   * @param {String} type zip or tar. defaults to zip.
   * 
   * @returns {Promise} resolves to full path to download (including filename)
   */
  getReleaseSnapshot(repoOrg, repoName, tag, downloadPath, type='zip') {
    if( type === 'tar' || type === 'gz' ) type = 'tar.gz';

    let options = {
      uri : this.getReleaseSnapshotUrl(repoOrg, repoName, tag, type),
      headers : {
        'User-Agent' : 'EcoSML Webapp'
      }
    }

    return new Promise((resolve, reject) => {
      request.get(options)
        .on('response', res => {
          if( res.statusCode !== 200 ) {
            return reject(res);
          }

          let filename = 'gitlab-'+repoOrg+'-'+repoName+'-'+tag+'.'+type;
          downloadPath = path.join(downloadPath, filename);

          let wstream = fs.createWriteStream(downloadPath)
            .on('close', () => resolve(downloadPath))
            .on('error', e => reject(e));

          res.pipe(wstream);
        })
        .on('error', e => reject(e));
    });
  }

}

module.exports = new Gitlab();