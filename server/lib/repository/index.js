const github = require('./github');
const gitlab = require('./gitlab');
const bitbucket = require('./bitbucket');
const config = require('../config');
const git = require('../git');

class Repository {

  constructor() {
    this.HOSTS = {
      GITLAB : 'gitlab',
      GITHUB : 'github',
      BITBUCKET : 'bitbucket'
    }
  }

  /**
   * @method getHost
   * @description get full host with protocol for host name
   * 
   * @param {String} host package host, should not include protocol
   * 
   * @returns {String}
   */
  getHost(host) {
    if( host === this.HOSTS.GITHUB ) {
      return config.github.host;
    } else if ( host === this.HOSTS.GITLAB ) {
      return config.gitlab.host;
    } else if( host === this.HOSTS.BITBUCKET ) {
      return config.bitbucket.host;
    }
    // TODO: allow any host?
    throw new Error('Unknown host: '+host);
  }

  /**
   * @method exists
   * @description does a repository exist
   * 
   * @param {String} host package host, should not include protocol
   * @param {String} packageName package name
   * @param {String} org Optional.  Defaults to EcoSML
   * 
   * @returns {Promise} resolves to Boolean
   */
  async exists(host, packageName, org='ecosml') {
    if( host === this.HOSTS.GITHUB ) {
      return !(await github.isRepoNameAvailable(packageName, org));
    } else if ( host === this.HOSTS.GITLAB ) {
      return gitlab.exists(packageName, org);
    } else if ( host === this.HOSTS.BITBUCKET ) {
      return bitbucket.exists(packageName, org);
    }
    throw new Error('Unknown host: '+host);
  }

  /**
   * @method readme
   * @description load the readme text from repository.  This call
   * does not burn a API request.
   * 
   * @param {String} repoName
   * 
   * @returns {Promise} resolves to String 
   */
  readme(host, repoOrg, packageName) {
    if( host === this.HOSTS.GITHUB ) {
      return github.readme(repoOrg, packageName);
    } else if ( host === this.HOSTS.GITLAB ) {
      return gitlab.readme(repoOrg, packageName);
    } else if ( host === this.HOSTS.BITBUCKET ) {
      return bitbucket.readme(repoOrg, packageName);
    }
    throw new Error('Unknown host: '+host);
  }

  /**
   * @method overview
   * @description load the package overview text.  Note, this parses from
   * standard HTML request so does not take a API hit.
   * 
   * @param {String} host 
   * @param {String} packageName 
   * 
   * @returns {Promise} resolves to string
   */
  overview(host, repoOrg, packageName) {
    if( host === this.HOSTS.GITHUB ) {
      return github.overview(repoOrg, packageName);
    } else if ( host === this.HOSTS.GITLAB ) {
      return gitlab.overview(repoOrg, packageName);
    } else if ( host === this.HOSTS.BITBUCKET ) {
      return bitbucket.overview(repoOrg, packageName);
    }
    throw new Error('Unknown host: '+host);
  }

  /**
   * @method latestRelease
   * @description return the latest release tag name.  Note, this
   * call does not burn a API request.
   * 
   * @param {String} host
   * @param {String} repoName 
   * 
   * @returns {Promise} resolves to null or tag object
   */
  async latestRelease(host, repoOrg, repoName) {
    if( host === this.HOSTS.GITHUB ) {
      return github.latestRelease(repoOrg, repoName);
    } else if ( host === this.HOSTS.GITLAB ) {
      return gitlab.latestRelease(repoOrg, repoName);
    } else if ( host === this.HOSTS.BITBUCKET ) {
      return bitbucket.latestRelease(repoOrg, repoName);
    }
    throw new Error('Unknown host: '+host);
  }

  getReleaseSnapshotUrl(host, repoOrg, repoName, tag, type='zip') {
    if( host === this.HOSTS.GITHUB ) {
      return github.getReleaseSnapshotUrl(repoOrg, repoName, tag, type);
    } else if ( host === this.HOSTS.GITLAB ) {
      return gitlab.getReleaseSnapshotUrl(repoOrg, repoName, tag, type);
    } else if ( host === this.HOSTS.BITBUCKET ) {
      return bitbucket.getReleaseSnapshotUrl(repoOrg, repoName, tag, type);
    }
    throw new Error('Unknown host: '+host);
  }

  getReleaseSnapshot(host, repoOrg, repoName, tag, downloadPath, type='zip') {
    if( host === this.HOSTS.GITHUB ) {
      return github.getReleaseSnapshot(repoOrg, repoName, tag, downloadPath, type);
    } else if ( host === this.HOSTS.GITLAB ) {
      return gitlab.getReleaseSnapshot(repoOrg, repoName, tag, downloadPath, type);
    } else if ( host === this.HOSTS.BITBUCKET ) {
      return bitbucket.getReleaseSnapshot(repoOrg, repoName, tag, downloadPath, type);
    }
    throw new Error('Unknown host: '+host);
  }

  /**
   * @method getReleases
   * @description get the full list of releases.
   * 
   * @param {String} host 
   * @param {String} packageName
   * 
   * @returns {Promise} resolves to array 
   */
  async getReleases(pkg) {
    await git.noCheckoutClone(pkg.htmlUrl);
    let tags = await git.noCheckoutTagDates(pkg.htmlUrl);
    tags = tags.map(tag => ({
      body : '',
      htmlUrl: pkg.htmlUrl, // TODO: make this point at real url for release
      createdAt : tag.timestamp,
      publishedAt : tag.timestamp,
      name : tag.tag,
      tagName : tag.tag,
      tarballUrl : this.getReleaseSnapshotUrl(pkg.host, pkg.repoOrg, pkg.packageName, tag, 'tar'),
      zipballUrl: this.getReleaseSnapshotUrl(pkg.host, pkg.repoOrg, pkg.packageName, tag, 'zip')
    }));
    return tags
  }

}

module.exports = new Repository();