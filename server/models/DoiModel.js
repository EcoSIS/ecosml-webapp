const doi = require('../lib/doi');
const mongo = require('../lib/mongo');
const config = require('../lib/config');
const github = require('../lib/github');
const utils = require('../lib/utils');
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
    if( typeof pkg === 'string' ) {
      pkg = await mongo.getPackage(pkg);
    }

    logger.info('user requesting doi', pkg.id, tag, user);

    let existingRequest = await mongo.getDoiRequest(pkg.id, tag);
    if( existingRequest && existingRequest.state !== config.doi.states.rejected ) {
      throw new Error(`Package ${pkg.id} tag ${tag} already has a doi request`);
    }

    let release = (pkg.releases || []).find(r => r.name === tag);
    if( !release ) throw new Error(`Package ${pkg.id} has not release: ${tag}`);

    if( !user ) throw new Error('You must provide a username of person making DOI request');

    // download snapshot, if this fails, we should error out
    logger.info('downloading code snapshot', pkg.id, tag);
    let file = await github.getReleaseSnapshot(pkg.name, tag, config.doi.snapshotDir);
    let filename = path.parse(file).base;

    return mongo.setDoiRequest(pkg.id, tag, user, filename);
  }

  /**
   * @method rejectRequest
   * @description admin rejects doi request
   * 
   */
  async rejectRequest(pkg, tag, username) {
    if( typeof pkg === 'string' ) {
      pkg = await mongo.getPackage(pkg);
    }

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
    if( !existingRequest ) throw new Error(`Package has no DOI request for ${pkg.id} ${tag}`)

    if( existingRequest.state === config.doi.states.accepted || 
        existingRequest.state === config.doi.states.applied ) {
      throw new Error(`Package release already has a doi ${pkg.id} ${tag}`)
    }

    if( existingRequest.state !== config.doi.states.pendingApproval ) {
      throw new Error(`DOI request is not in pending-approval state: ${pkg.id} ${tag}, state=${existingRequest.state}`);
    }

    let release = (pkg.releases || []).find(r => r.name === tag);
    if( !release ) throw new Error(`Package ${pkg.id} has not release: ${tag}`);

    // set that it has been accepted
    await mongo.setDoiRequestState(pkg.id, tag, config.doi.states.accepted, username);

    // download snapshot.  will be stored in S3 backup for safe keeping
    logger.info('downloading code snapshot', pkg.id, tag);
    await github.getReleaseSnapshot(pkg.name, tag, config.doi.snapshotDir);

    // now mint doi
    logger.info('minting doi', pkg.id, tag);
    let doiNum = await doi.mint(pkg, tag);

    logger.info('setting final doi state', pkg.id, tag);
    await mongo.setDoiRequestState(pkg.id, tag, config.doi.states.applied, username, doiNum);
  }

  /**
   * @method getSnapshotPath
   * @description get a snapshot (zip) that we have downloaded from github / repo
   * at the time of minting.
   * 
   * @param {Object} pkg package object
   * @param {String} tag 
   */
  async getSnapshotPath(pkg, tag) {
    let collection = await mongo.getDoiCollection();
    let doi = await collection.findOne({id: pkg.id, tag});
    if( !doi ) throw new Error(`Unknown doi for: ${pkg.id} ${tag}`);

    return path.join(config.doi.snapshotDir, doi.snapshot);
  }

  /**
   * @method searchDois
   * @descriptions search dois based on package test or doi state
   * 
   * @param {Object} options
   * @param {String} options.text limit by package text
   * @param {String} options.state limit by doi state
   * @param {String}
   */
  async searchDois(options={}) {
    let agg = [];
    if( !options.limit ) options.limit = 10;

    if( options.text ) {
      agg.push({ $match : 
        { $text: { $search: options.text} }
      });
    }

    agg.push({
      $lookup:
         {
           from: "doi",
           localField : "id",
           foreignField : "id",
           as: "dois"
       }
    });

    agg.push({$match : 
      {'dois.0' : {$exists: true}} 
    });

    if( options.state ) {
      agg.push({$match : 
        { 'dois.state' : options.state } 
      });
    }

    if( options.offset ) {
      agg.push({$skip: options.skip});
    }

    agg.push({$limit: options.limit});

    let collection = await mongo.packagesCollection();
    let result = await collection.aggregate(agg).toArray();
    
    let dois = [];
    result.forEach(pkg => {
      pkg.dois.forEach(doi => {
        doi.package = {
          name : pkg.name,
          overview : pkg.overview
        }

        dois.push(doi);
      });
    });

    return dois;
  }

  async getIdFromDoi(doi) {
    let collection = await mongo.getDoiCollection();
    return collection.findOne({doi});
  }

  getDoiRequest(pkgId, tag) {
    return mongo.getDoiRequest(pkgId, tag);
  }

  getPendingDois() {
    return mongo.getPendingDois();
  }

  getApprovedDois() {
    return mongo.getApprovedDois();
  }

}

module.exports = new DoiModel();