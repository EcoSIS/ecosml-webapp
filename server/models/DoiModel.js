const doi = require('../lib/doi');
const mongo = require('../lib/mongo');
const config = require('../lib/config');

class DoiModel {

  /**
   * @method request
   * @description user requests a doi 
   * 
   * @param {Object} pkg 
   */
  async request(pkg, user) {
    let existingRequest = await mongo.getDoiRequest(pkg.id);
    if( existingRequest ) throw new Error(`Package ${pkg.id} already has a doi request`);

    return mongo.setDoiRequest(pkg.id, user);
  }

  /**
   * @method rejectRequest
   * @description admin rejects doi request
   * 
   */
  rejectRequest(pkg, username) {
    return mongo.setDoiRequestState(pkg.id,  config.doi.states.rejected, username);
  }

  /**
   * @method requestUpdates 
   * @description admin requests updates for approval
   * 
   * @param {*} pkg 
   * @param {*} message 
   */
  requestUpdates(pkg, username, message) {
    return mongo.setDoiRequestState(pkg.id,  config.doi.states.rejected, username, message);
  }

  /**
   * @method approve
   * @description admin approves doi
   * 
   * @param {*} pkg 
   */
  approve(pkg, username) {
    await doi.mint(pkg);
    await mongo.setDoiRequestState(pkg.id,  config.doi.states.accepted, username);
  }

  getIdFromDoi(doi) {
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