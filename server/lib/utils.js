const config = require('./config');

class AppUtils {

  /**
   * @method toCamelCase
   * @description convert an objects properties to camel case from underscore
   * case.  Very useful for converting github API responses. A new object is returned.
   * 
   * @param {Object} object object with properties to convert.
   * 
   * @returns {Object} new object with camel case
   */
  toCamelCase(object) {
    let newObject = {};
    for( let key in object ) {
      newObject[this._toCamelCase(key)] = object[key];
    }
    return newObject;
  }

  _toCamelCase(str) {
    return str.replace(/_([a-z])/g, (g) => { return g[1].toUpperCase(); });
  }

  ecosmlToMetadataFile(repo) {
    return {
      id : repo.id,
      name : repo.name,
      overview : repo.overview,
      keywords : repo.keywords,
      theme : repo.theme,
      family : repo.family,
      specific : repo.specific,
      organization : repo.organization,
      language : repo.language,
      owner : repo.owner
    }
  }

  /**
   * @method githubReleaseToEcosml
   * @description convert github release object to ecosml release object
   * 
   * @param {Object} release github release object
   */
  githubReleaseToEcosml(release) {
    if( release.author ) delete release.author;
    release.created_at = new Date(release.created_at);
    release.published_at = new Date(release.published_at);
    return this.toCamelCase(release);
  }

  /**
   * @method githubRepoToEcosml
   * @description convert github json object to ecosml json object
   * 
   * @param {Object} repo github json object
   */
  githubRepoToEcosml(repo) {
    if( typeof repo === 'string' ) {
      repo = JSON.parse(repo);
    }

    let ecosmlRepo = {
      githubId : repo.id,
      cloneUrl : repo.clone_url,
      createdAt : new Date(repo.created_at),
      overview : repo.description,
      downloadsUrl : repo.downloads_url,
      host : 'github',
      repoOrg : repo.full_name.split('/')[0],
      name : repo.name,
      fullName : 'github/'+repo.full_name,
      gitUrl : repo.git_url,
      htmlUrl : repo.html_url,
      private : repo.private,
      sshUrl : repo.ssh_url,
      updatedAt : new Date(repo.updated_at),
      pushedAt : new Date(repo.pushed_at),
      releases : []
    }

    if( repo.releases ) {
      ecosmlRepo.releases = repo.releases.map(release => this.githubReleaseToEcosml(release));
    }

    return ecosmlRepo;
  }

  /**
   * @method getRepoNameAndOrg
   * @description given a repository name, split out org from repo name
   * if it contains one, otherwise return default org.
   * 
   * @param {String} repoName
   * 
   * @returns {Object}
   */
  getRepoNameAndOrg(repoName, org) {
    if( org ) return {repoName, org};
    if( repoName.indexOf('/') > -1 ) {
      repoName = repoName.split('/');
      org = repoName[0];
      repoName = repoName[1];
    } else {
      org = config.github.org;
    }
    return {repoName, org};
  }

}

module.exports = new AppUtils();