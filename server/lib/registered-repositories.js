const git = require('./git');
const config = require('./config');
const fs = require('fs-extra');
const path = require('path');
const clone = require('clone');
const repository = require('./repository');
const mongo = require('./mongo');
const logger = require('./logger');

class RegisteredRepositories {

  constructor() {
    // this.config = config.github.registeredRepositories;
    // this.repoFileRoot = path.join(git.rootDir, this.config.repoName, config.server.serverEnv);
    // this.queue = [];
  }

  // _getRepoFilePath(pkg) {
  //   let name = pkg.name;
  //   if( name.indexOf('/') === -1 ) {
  //     name = config.github.org+'/'+name;
  //   }

  //   let repoFile = path.join(this.repoFileRoot, name);
  //   let repoDir = path.resolve(repoFile, '..');
  //   repoFile = repoFile+'.json';
  //   return {repoFile, repoDir};
  // }

  // async _reset() {
  //   await git.ensureDir(this.config.repoName);
  //   await git.resetHEAD(this.config.repoName);
  //   await git.pull(this.config.repoName);
  // }

  // async _commit(pkg, remove=false) {
  //   let changes = await git.currentChangesCount(this.config.repoName);
  //   if( changes === 0 ) return false;

  //   let update = remove ? 'Removing' : 'Updating';

  //   await git.addAll(this.config.repoName);
  //   await git.commit(this.config.repoName, update+' '+pkg.name);
  //   await git.push(this.config.repoName);
  //   return true;
  // }

  // async _updateRepo(pkg) {
  //   let {repoFile, repoDir} = this._getRepoFilePath(pkg);
  //   await fs.mkdirp(repoDir);

  //   pkg = clone(pkg);
  //   for( let attr of this.config.removeAttributes ) {
  //     if( pkg[attr] ) delete pkg[attr];
  //   }

  //   await fs.writeFile(repoFile, JSON.stringify(pkg, '  ', '  '));
  //   return await this._commit(pkg);
  // }

  // async _removeRepo(pkg) {
  //   let {repoFile} = this._getRepoFilePath(pkg);
  //   if( fs.existsSync(repoFile) ) {
  //     await fs.remove(repoFile);
  //   }
  //   return await this._commit(pkg, true);
  // }

  // async _update() {
  //   this.running = true;
  //   let {updates, resolve, reject} = this.queue.shift();
  //   if( !Array.isArray(updates) ) updates = [updates];

  //   try {
  //     await this._reset();

  //     let updated;
  //     for( let update of updates ) {
  //       if( update.remove ) {
  //         updated = await this._removeRepo(update.data);
  //       } else {
  //         updated = await this._updateRepo(update.data);
  //       }
  //     }

  //     resolve(updated);
  //   } catch(e) {
  //     reject(e);
  //   }

  //   if( this.queue.length > 0 ) {
  //     this._update();
  //   } else {
  //     this.running = false;
  //   }
  // }

  /**
   * @method update
   * @description add or update package.  This adds to a queue in case multiple updates
   * happen at once.
   * 
   * @param {Object} pkg package object too update
   * 
   * @returns {Promise}
   */
  // async update(pkg) {
  //   return new Promise((resolve, reject) => {
  //     this.queue.push({updates: {data: pkg}, resolve, reject});
  //     if( !this.running ) this._update();
  //   });
  // }

  /**
   * @method remove
   * @description remove package.  This adds to a queue in case multiple updates
   * happen at once.
   * 
   * @param {Object} pkg package object too update
   * 
   * @returns {Promise}
   */
  // async remove(pkg) {
  //   return new Promise((resolve, reject) => {
  //     this.queue.push({updates: {data: pkg, remove: true}, resolve, reject});
  //     if( !this.running ) this._update();
  //   });
  // }

  // async batch(pkgs) {
  //   return new Promise((resolve, reject) => {
  //     this.queue.push({updates: pkgs, resolve, reject});
  //     if( !this.running ) this._update();
  //   });
  // }

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
    let {release, releases, overview, description} = await this.getProperties(pkg.host, pkg.name);

    // add properties stored in github repo
    if( releases ) {
      pkg.releases = releases;
      pkg.releaseCount = releases.length;

      // insure the latest release is the last in the list
      if( release ) {
        let index = pkg.releases.findIndex(r => r.tag === release.tag);
        if( index !== pkg.releaseCount-1 ) {
          let r = pkg.releases.splice(index, 1);
          pkg.releases.push(r[0]);
        }
      }

    } else {
      pkg.releases = [];
      pkg.releaseCount = 0;
    }
    pkg.overview = overview;
    pkg.description = description;

    return pkg;
  }

  /**
   * @method syncAllProperties
   * @description sync all remotely stored properties to mongodb for all registered repositories
   */
  // async syncAllPropertiesToMongo() {
  //   let ids = await mongo.getAllRegisteredRepositoryIds();
  //   let results = [];

  //   for( let id of ids ) {
  //     try {
  //       await this.syncPropertiesToMongo(id.id);
  //       results.push({id: id.id, succes: true});
  //     } catch(e) {
  //       logger.error(e);
  //       results.push({
  //         id: id.id, 
  //         error: true, 
  //         message : e.message
  //       });
  //     }
  //   }

  //   return results;
  // }

  async syncPropertiesToMongo(pkg, host) {
    if( typeof pkg === 'string' ) {
      pkg = await mongo.getPackage(pkg, host);
    }
    await this.syncProperties(pkg);
    await mongo.updatePackage(pkg.id, pkg);
    return pkg;
  }

  /**
   * @method backupAll
   * @description write all registered repository mongodb data to backup github repo
   * 
   * @returns {Promise} 
   */
  // async backupAll() {
  //   let ids = await mongo.getAllRegisteredRepositoryIds();
  //   let results = [];

  //   for( let id of ids ) {
  //     let pkg = await mongo.getPackage(id.id);
  //     try {
  //       let updated = await this.update(pkg);
  //       results.push({id: pkg.id, succes: true, updated});
  //     } catch(e) {
  //       logger.error(e);
  //       results.push({
  //         id: id.id, 
  //         error: true, 
  //         message : e.message
  //       });
  //     }
  //   }

  //   return results;
  // }

  /**
   * @method restoreAll
   * @description WARNING. This completely restore MongoDB from the state of the backup repo
   */
  // async restoreAll() {
  //   await this._reset();
  //   let repos = [];
  //   if( fs.existsSync(this.repoFileRoot) ) {
  //     await this._walkAndRestore(this.repoFileRoot, repos);
  //   }
  //   return repos;
  // }

  // async _walkAndRestore(dir, repos) {
  //   let files = await fs.readdir(dir);
  //   for( let file of files ) {
  //     // ignore . files
  //     if( file.match(/^\./) ) continue;
  //     file = path.resolve(dir, file);
      
  //     // insert .json files into mongodb 
  //     if( path.parse(file).ext === '.json' ) {
  //       let data = require(file);
  //       logger.info(`Syncing Registered Repository ${data.name}`);
  //       await this.syncProperties(data);
  //       await mongo.insertPackage(data);
  //       repos.push(data.name);
  //       continue;
  //     }
      
  //     // id dir, walk
  //     let stat = await fs.stat(file);
  //     if( stat.isDirectory() ) {
  //       await this._walkAndRestore(file, repos);
  //     }
  //   }
  // }

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
  async getProperties(host, repoName) {
    let release = await repository.latestRelease(host, repoName);
    let overview = await repository.overview(host, repoName);
    let description = await repository.readme(host, repoName);
    let releases = await repository.getReleases(host, repoName);
    return {release, releases, overview, description};
  }

}

module.exports = new RegisteredRepositories();