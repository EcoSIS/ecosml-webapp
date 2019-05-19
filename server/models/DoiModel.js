const doi = require('../lib/doi');
const mongo = require('../lib/mongo');
const config = require('../lib/config');
const aws = require('../lib/aws');
const github = require('../lib/github');
const utils = require('../lib/utils');
const os = require('os');
const fs = require('fs-extra');
const path = require('path')
const logger = require('../lib/logger');

class DoiModel {

  /**
   * @method request
   * @description user requests a doi 
   * 
   * @param {Object} pkg 
   */
  async request(pkg={}, tag='', user) {
    logger.info('user requesting doi', pkg.id, tag, user);

    let existingRequest = await mongo.getDoiRequest(pkg.id, tag);
    if( existingRequest ) throw new Error(`Package ${pkg.id} already has a doi request`);

    let release = (pkg.releases || []).find(r => r.name === tag);
    if( !release ) throw new Error(`Package ${pkg.id} has not release: ${tag}`);

    if( !user ) throw new Error('You must provide a username of person making DOI request');

    return mongo.setDoiRequest(pkg.id, tag, user);
  }

  /**
   * @method rejectRequest
   * @description admin rejects doi request
   * 
   */
  rejectRequest(pkg, tag, username) {
    logger.info('admin rejecting doi request', pkg.id, tag, username);
    return mongo.setDoiRequestState(pkg.id, tag, config.doi.states.rejected, username);
  }

  /**
   * @method requestUpdates 
   * @description admin requests updates for approval
   * 
   * @param {*} pkg 
   * @param {*} message 
   */
  requestUpdates(pkg, tag, username, message) {
    logger.info('admin requesting updates to doi request', pkg.id, tag, username);
    return mongo.setDoiRequestState(pkg.id, tag, config.doi.states.pendingRevision, username, message);
  }

  /**
   * @method mint
   * @description admin approves doi
   * 
   * @param {*} pkg 
   */
  async mint(pkg, tag, username) {
    logger.info('admin minting doi', pkg.id, tag, username);

    let existingRequest = await mongo.getDoiRequest(pkg.id, tag);
    if( existingRequest && (
        existingRequest.state === config.doi.states.accepted || 
        existingRequest.state === config.doi.states.applied
      )) {
      throw new Error(`Package release already has a doi ${pkg.id} ${tag}`)
    }

    let release = (pkg.releases || []).find(r => r.name === tag);
    if( !release ) throw new Error(`Package ${pkg.id} has not release: ${tag}`);

    var {repoName, org} = utils.getRepoNameAndOrg(pkg.name);

    // set that it has been accepted
    await mongo.setDoiRequestState(pkg.id, tag, config.doi.states.accepted, username);

    // get and upload github snapshot to S3
    logger.info('downloading code snapshot', pkg.id, tag);
    let zipball = await github.getReleaseSnapshot(pkg.name, tag, os.tmpdir());

    // For AWS storage
    // let bucketPath = path.join(org, repoName, tag+'.zip');
    // await aws.uploadFile(zipball, config.aws.bucket.doiSnapshots, bucketPath);
    
    // For Server storage
    
    let snapshotPath = path.join(config.doi.snapshotDir, org, repoName);
    await fs.mkdirp(snapshotPath);
    snapshotPath = path.join(snapshotPath, tag+'.zip');
    if( fs.existsSync(snapshotPath) ) {
      await fs.unlink(snapshotPath);
    }
    await fs.move(zipball, snapshotPath);

    // now mint doi
    logger.info('minting doi', pkg.id, tag);
    let doiNum = await doi.mint(pkg, tag);

    logger.info('setting final doi state', pkg.id, tag);
    await mongo.setDoiRequestState(pkg.id, tag, config.doi.states.applied, username, doiNum);
  }

  async getIdFromDoi(doi) {
    let collection = await mongo.getDoiCollection();
    return collection.findOne({doi});
  }

  getPendingDois() {
    return mongo.getPendingDois();
  }

  getApprovedDois() {
    return mongo.getApprovedDois();
  }

}

module.exports = new DoiModel();