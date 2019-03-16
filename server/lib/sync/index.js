const ecosis = require('./ecosis');
const github = require('./github');

class DataSync {

  /**
   * @method syncAll
   * @description sync all data from github and ecosis. WARNING: this
   * wipes the system and restores from state of both github and ecosis.
   * 
   * @returns {Promise}
   */
  async syncAll() {
    // YOU MUST DO THIS FIRST!
    await github.syncAllRepos();
    // add github account data.  will be used below to create teams
    await ecosis.syncGithubData();
    // syncing orgs to github teams expect repos in mongodb
    await this.syncOrgs();
  }

  /**
   * @method syncOrgs
   * @description make sure all EcoSIS orgs are sync to redis and
   * that EcoSIS org are synced to github teams
   * 
   * @returns {Promise}
   */
  async syncOrgs() {
    // add github account data.  will be used below to create teams
    await ecosis.syncGithubData();
    await github.syncAllTeamsToMongo();
    return ecosis.syncOrgs();
  }

}

module.exports = new DataSync();