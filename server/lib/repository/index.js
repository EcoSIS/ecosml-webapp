const github = require('./github');
const gitlab = require('./gitlab');
const config = require('../config');
const git = require('../git');

class Repository {

  constructor() {
    this.HOSTS = {
      GITLAB : 'gitlab',
      GITHUB : 'github'
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
    }
    throw new Error('Unknown host: '+host);
  }

  /**
   * @method isRepoNameAvailable
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
  readme(host, packageName) {
    if( host === this.HOSTS.GITHUB ) {
      return github.readme(packageName);
    } else if ( host === this.HOSTS.GITLAB ) {
      return gitlab.readme(packageName);
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
  overview(host, packageName) {
    if( host === this.HOSTS.GITHUB ) {
      return github.overview(packageName);
    } else if ( host === this.HOSTS.GITLAB ) {
      return gitlab.overview(packageName);
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
  async latestRelease(host, packageName) {
    if( host === this.HOSTS.GITHUB ) {
      return github.latestRelease(packageName);
    } else if ( host === this.HOSTS.GITLAB ) {
      return gitlab.latestRelease(packageName);
    }
    throw new Error('Unknown host: '+host);
  }

  /**
   * @method getReleases
   * @description get the full list of releases
   * 
   * @param {String} host 
   * @param {String} packageName
   * 
   * @returns {Promise} resolves to array 
   */
  async getReleases(host, packageName) {
    let htmlUrl = 'https://'+host+'.com/'+packageName;
    let tags = await git.getRemoteTags(htmlUrl);
    if( host === this.HOSTS.GITHUB ) {
      tags = tags.map(tag => ({
        body : '',
        htmlUrl,
        name : tag,
        tagName : tag,
        tarballUrl : github.getReleaseSnapshotUrl(packageName, tag, 'tar'),
        zipballUrl: github.getReleaseSnapshotUrl(packageName, tag, 'zip')
      }));
    } else if ( host === this.HOSTS.GITLAB ) {
      tags = tags.map(tag => ({
        body : '',
        htmlUrl,
        name : tag,
        tagName : tag,
        tarballUrl : gitlab.getReleaseSnapshotUrl(packageName, tag, 'tar'),
        zipballUrl: gitlab.getReleaseSnapshotUrl(packageName, tag, 'zip')
      }));
    }
    return tags;
  }

}

module.exports = new Repository();