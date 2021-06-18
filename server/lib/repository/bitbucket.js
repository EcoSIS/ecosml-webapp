const fetch = require('node-fetch');
const request = require('request');
const config = require('../config');
const {JSDOM} = require('jsdom');
const logger = require('../logger');
const fs = require('fs');
const path = require('path');

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
   * @param {String} repoOrg
   * @param {String} repoName
   * 
   * @returns {Promise} resolves to String 
   */
  async readme(repoOrg, repoName, branch='master') {
    let {response, body} = await this.getRawFile(repoOrg, repoName, 'README.md', branch);
    if( response.ok ) return body;
    
    ({response, body} = await this.getRawFile(repoOrg, repoName, 'README', branch));
    if( response.ok ) return body;

    return '';
  }

  /**
   * @method getRawFile
   * @description download a file directly from bitbucket repo
   * 
   * @param {String} repoOrg
   * @param {String} repoName name of repository
   * @param {String} filePath full path to file in repo
   * @param {String} branch optional. defaults to 'master'
   * 
   * @returns {Promise} resolves to http response
   */
  async getRawFile(repoOrg, repoName, filePath, branch = 'master') {
    let uri = `${config.bitbucket.host}/${repoOrg}/${repoName}/raw/${branch}/${filePath}`;
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
   * @param {String} repoOrg
   * @param {*} repoName 
   */
  async overview(repoOrg, repoName) {
    let response = await fetch(`${config.bitbucket.host}/${repoOrg}/${repoName}`);

    if( response.status !== 200 ) {
      throw new Error(`Unknown repository: ${repoOrg}/${repoName}`)
    }

    const dom = new JSDOM(await response.text(), {runScripts: "dangerously"});
    try {
      return dom.window.__initial_state__.section.repository.currentRepository.description;
    } catch(e) {
      logger.error('Failed to parse bitbucket description', e);
    }

    return '';
  }

  async latestRelease(repoOrg, repoName) {
    let response = await fetch(
      `${config.bitbucket.host}/!api/2.0/repositories/${repoOrg}/${repoName}/refs/tags?pagelen=50&sort=-target.date`,
    );

    if( response.status !== 200 ) {
      throw new Error(`Unknown repository: ${repoOrg}/${repoName}`)
    }

    let tag = (await response.json()).values[0];
    return {
      body : '',
      htmlUrl: tag.links.html.href,
      name : tag.name,
      tagName : tag.name,
      tarballUrl : this.getReleaseSnapshotUrl(repoOrg, repoName, tag.name, 'tar.gz'),
      zipballUrl: this.getReleaseSnapshotUrl(repoOrg, repoName, tag.name, 'zip')
    }
  }

  getReleaseSnapshotUrl(repoOrg, repoName, tag, type='zip') {
    if( type === 'tar' || type === 'gz' ) type = 'tar.gz';
    return `${config.bitbucket.host}/${repoOrg}/${repoName}/get/${tag}.${type}`;
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

          let filename = 'bitbucket-'+repoOrg+'-'+repoName+'-'+tag+'.'+type;
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

module.exports = new Bitbucket();