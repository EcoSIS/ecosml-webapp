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
    await this.syncOrgs();
    return github.syncAllRepos();
  }

  /**
   * @method syncOrgs
   * @description make sure all EcoSIS orgs are sync to redis and
   * that EcoSIS org are synced to github teams
   * 
   * @returns {Promise}
   */
  async syncOrgs() {
    await github.syncAllTeams();
    return ecosis.syncOrgs();
  }

}

module.exports = new DataSync();