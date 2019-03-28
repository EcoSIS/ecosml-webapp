const doi = require('../lib/doi');
const mongo = require('../lib/mongo');

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

    await mongo.setDoiRequest(pkg.id, user);
  }

  /**
   * @method rejectRequest
   * @description admin rejects doi request
   * 
   */
  rejectRequest() {

  }

  /**
   * @method requestUpdates 
   * @description admin requests updates for approval
   * 
   * @param {*} pkg 
   * @param {*} message 
   */
  requestUpdates(pkg, message) {

  }


  /**
   * @method approve
   * @description admin approves doi
   * 
   * @param {*} pkg 
   */
  approve(pkg) {

  }

  getPendingDois() {

  }

  getApprovedDois() {

  }

}

module.exports = new DoiModel();