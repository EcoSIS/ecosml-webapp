const travis = require('../lib/travis-ci');

const DEFAULT_SETTINGS = {
  build_pushes : false,
  build_pull_requests : false
}

class PackageTestModel {

  constructor() {
    this.testingBufferTime = 1000 * 60 * 2;
    this.buffer = {};
  }

  /**
   * @method initRepo
   * @description sync all github repositories to travis, set default EcoSML
   * setttings of build_pushes and build_pull_requests to false.
   * 
   * @param {String} repoName 
   * 
   * @returns {Promise}
   */
  async initRepo(repoName) {
    await travis.syncRepositories();
    for( var key in DEFAULT_SETTINGS ) {
      await travis.setRepositorySettings(repoName, key, DEFAULT_SETTINGS[key]);
    }
  }

  /**
   * @method runTestBuffered
   * @description run repo tests after a certain buffer period
   * 
   * @param {Object} pkg ecosml pkg
   */
  runTestBuffered(pkg) {
    if( this.buffer[pkg.name] ) {
      clearTimeout(this.buffer[pkg.name]);
    }

    this.buffer[pkg.name] = setTimeout(() => {
      delete this.buffer[pkg.name];
      this.runTest(pkg);
    }, this.buffer);
  }

  /**
   * @method runTest
   * @description run repo tests.  You probably want to call 
   * runTestBuffered and not this method.
   * 
   * @param {Object} pkg ecosml pkg
   * 
   * @returns {Promise}
   */
  async runTest(pkg) {
    
  }

}

module.exports = new PackageTestModel();