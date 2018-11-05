const git = require('./git');
const config = require('./config');
const fs = require('fs-extra');
const path = require('path');
const clone = require('clone');

class RegisteredRepositories {

  constructor() {
    this.config = config.github.registeredRepositories;
    this.repoFile = path.join(git.rootDir, this.config.file);
    this.queue = [];
  }

  async _load() {
    await git.clone(this.config.repoName);
    
    if( fs.existsSync(this.repoFile) ) {
      this.data = require(this.repoFile);
    } else {
      this.data = [];
      await fs.writeFile(this.repoFile, '[]');
    }

    return this.data;
  }

  async _update() {
    this.running = true;
    let {pkg, resolve, reject} = this.queue.shift();

    try {
      await this.load();

      pkg = clone(pkg);
      for( let attr in this.config.removeAttributes ) {
        if( pkg[attr] ) delete pkg[attr];
      }

      let found = false;
      for( let i = 0; i < this.data.length; i++ ) {
        if( this.data[i].id === pkg.id ) {
          this.data[i] = pkg;
          found = true;
          break;
        }
      }
      if( !found ) this.data.push(pkg);

      await fs.writeFile(this.repoFile, this.repoFile);
      
      let changes = await git.currentChangesCount(this.config.repoName);
      if( changes === 0 ) return;

      await git.addAll(packageName);
      await git.commit(packageName, (found ? 'Adding' : 'Updating')+' '+pkg.name);
      await git.push(packageName);

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
      this.queue.push({pkg, resolve, reject});
      if( !this.running ) this._update();
    });
  }

}

module.exports = new RegisteredRepositories();