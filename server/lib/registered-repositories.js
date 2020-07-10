const repository = require('./repository');
const mongo = require('./mongo');

class RegisteredRepositories {

  /**
   * @method syncProperties
   * @description load release, overview and description information from remote
   * github repository.  Takes a package object and sets values on provided object.
   * 
   * @param {Object} pkg package object
   * 
   * @return {Promise}
   */
  async syncProperties(pkg) {
    let {releases, overview, description} = await this.getProperties(pkg.host, pkg.repoOrg, pkg.name);

    // add properties stored in github repo
    if( releases ) {
      pkg.releases = releases;
      pkg.releaseCount = releases.length;

      // JM - sorting by semver in getReleases now
      // insure the latest release is the last in the list
      // if( release ) {
      //   let index = pkg.releases.findIndex(r => r.tag === release.tag);
      //   if( index !== pkg.releaseCount-1 ) {
      //     let r = pkg.releases.splice(index, 1);
      //     pkg.releases.push(r[0]);
      //   }
      // }

    } else {
      pkg.releases = [];
      pkg.releaseCount = 0;
    }
    pkg.overview = overview;
    pkg.description = description;

    return pkg;
  }

  async syncPropertiesToMongo(host, repoOrg, name) {
    let pkg = host;
    if( typeof host === 'string' ) {
      pkg = await mongo.getPackage(host+'/'+repoOrg+'/'+name);
    }
    await this.syncProperties(pkg);
    await mongo.updatePackage(pkg.id, pkg);
    return pkg;
  }

  /**
   * @method getProperties
   * @description get a registered repositories properties that are stored in the repository
   * metadata
   * 
   * @param {String} host
   * @param {String} repoName
   * 
   * @returns {Promise} resolves to object
   */
  async getProperties(host, repoOrg, repoName) {
    // let release = await repository.latestRelease(host, repoOrg, repoName);
    let overview = await repository.overview(host, repoOrg, repoName);
    let description = await repository.readme(host, repoOrg, repoName);
    let releases = await repository.getReleases(host, repoOrg, repoName);
    return {releases, overview, description};
  }

}

module.exports = new RegisteredRepositories();