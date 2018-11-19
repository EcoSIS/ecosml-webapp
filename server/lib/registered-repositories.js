const git = require('./git');
const config = require('./config');
const fs = require('fs-extra');
const path = require('path');
const clone = require('clone');
const github = require('./github');
const mongo = require('./mongo');

class RegisteredRepositories {

  constructor() {
    this.config = config.github.registeredRepositories;
    this.repoFile = path.join(git.rootDir, this.config.repoName, this.config.file);
    this.queue = [];
  }

  async _load() {
    await git.ensureDir(this.config.repoName);
    await git.resetHEAD(this.config.repoName);
    await git.pull(this.config.repoName);

    if( fs.existsSync(this.repoFile) ) {
      this.data = require(this.repoFile);
    } else {
      this.data = [];
      await fs.writeFile(this.repoFile, '[]');
    }

    return this.data;
  }

  async _updateData(pkg, remove) {
    let found = false;

    if( remove ) {
      for( let i = 0; i < this.data.length; i++ ) {
        if( this.data[i].id === pkg.id ) {
          this.data.splice(i, 1);
          break;
        }
      }
    } else {
      pkg = clone(pkg);
      for( let attr in this.config.removeAttributes ) {
        if( pkg[attr] ) delete pkg[attr];
      }

      for( let i = 0; i < this.data.length; i++ ) {
        if( this.data[i].id === pkg.id ) {
          this.data[i] = pkg;
          found = true;
          break;
        }
      }
      if( !found ) this.data.push(pkg);
    }
  }

  async _update() {
    this.running = true;
    let {updates, resolve, reject} = this.queue.shift();
    if( !Array.isArray(updates) ) {
      updates = Array.isArray(updates);
    }

    try {
      await this._load();
      
      updates.forEach(update => {
        this._updateData(update.data, update.remove);
      });

      await fs.writeFile(this.repoFile, JSON.stringify(this.data, '  ', '  '));
      
      let changes = await git.currentChangesCount(this.config.repoName);
      if( changes === 0 ) return resolve();

      let update = found ? 'Adding' : 'Updating';
      if( remove ) update = 'Removing';

      await git.addAll(this.config.repoName);
      await git.commit(this.config.repoName, update+' '+pkg.name);
      await git.push(this.config.repoName);

      resolve();
    } catch(e) {
      reject(e);
    }

    if( this.queue.length > 0 ) {
      this._update();
    } else {
      this.running = false;
    }
  }

  /**
   * @method update
   * @description add or update package.  This adds to a queue in case multiple updates
   * happen at once.
   * 
   * @param {Object} pkg package object too update
   * 
   * @returns {Promise}
   */
  async update(pkg) {
    return new Promise((resolve, reject) => {
      this.queue.push({updates: {data: pkg}, resolve, reject});
      if( !this.running ) this._update();
    });
  }

  /**
   * @method remove
   * @description remove package.  This adds to a queue in case multiple updates
   * happen at once.
   * 
   * @param {Object} pkg package object too update
   * 
   * @returns {Promise}
   */
  async remove(pkg) {
    return new Promise((resolve, reject) => {
      this.queue.push({updates: {data: pkg, remove: true}, resolve, reject});
      if( !this.running ) this._update();
    });
  }

  async batch(pkgs) {
    return new Promise((resolve, reject) => {
      this.queue.push({updates: pkgs, resolve, reject});
      if( !this.running ) this._update();
    });
  }

  async syncProperties(pkg) {
    let {release, overview, description} = await this.getGitHubProperties(pkg.name);

    // add properties stored in github repo
    if( release ) {
      pkg.releases = [release];
      pkg.releaseCount = 1;
    } else {
      pkg.releases = [release];
      pkg.releaseCount = 0;
    }
    pkg.overview = overview;
    pkg.description = description;

    return pkg;
  }

  async syncAll() {
    let ids = await mongo.getAllRegisteredRepositoryIds();
    for( let id of ids ) {
      let pkg = await mongo.getPackage(id);
      try {
        await this.syncProperties(pkg);
        await this.update(pkg);
      } catch(e) {
        logger.error(e);
      }
    }
  }

  /**
   * @method getGitHubProperties
   * @description get a registered repositories properties that are stored in the repository
   * metadata (in GitHub)
   * 
   * @param {String} repoName
   * 
   * @returns {Promise} resolves to object
   */
  async getGitHubProperties(repoName) {
    let release = await github.latestRelease(repoName);
    let overview = await github.overview(repoName);
    let description = await github.readme(repoName);
    return {release, overview, description};
  }

}

module.exports = new RegisteredRepositories();