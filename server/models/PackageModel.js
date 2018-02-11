const git = require('../lib/git');
const github = require('../lib/github');
const mongo = require('../lib/mongo');
const logger = require('../lib/logger');
const config = require('../lib/config');
const AppError = require('../lib/AppError');
const path = require('path');
const fs = require('fs-extra');
const uuid = require('uuid');
const utils = require('../lib/utils')
const markdown = require('../lib/markdown');


const METADATA_FILENAME = 'ecosml-metadata.json';

class PackageModel {

  constructor() {
    git.initConfig();
  }

  verifyRequired(attrs, obj) {
    attrs.forEach(attr => {
      if( !obj[attr] ) throw new AppError(`${attr} required`, AppError.ERROR_CODES.MISSING_ATTRIBUTE);
    });
  }

  checkStatus(response, expectedStatus) {
    if( response.statusCode !== expectedStatus ) {
      let body = response.body;
      try {
        body = JSON.parse(body).message
      } catch(e) {}

      throw new AppError(body, AppError.ERROR_CODES.BAD_API_RESPONSE);
    }
  }

  async checkAccess(user) {

  }

  /**
   * @method create
   * @description create a package
   * 
   * @param {Object} pkg package to create
   * @param {String} pkg.name package name
   * @param {String} pkg.description package short description
   * @param {String} pkg.organization package owner org
   * @param {String} pkg.owner package owner
   */
  async create(pkg) {
    logger.info(`Creating package: ${pkg.name}`);
    this.verifyRequired(config.schemaFilter.REQUIRED_CREATE, pkg);

    // check access
    await this.checkAccess();

    if( pkg.name.length < 4 ) throw new AppError('Package name must be at least 4 characters', AppError.ERROR_CODES.INVALID_ATTRIBUTE);
    if( pkg.description.length < 15 ) throw new AppError('Please provide a longer overview', AppError.ERROR_CODES.INVALID_ATTRIBUTE);

    let ecosmlId = uuid.v4();

    // create Github API Request
    let githubRepo = Object.assign({}, pkg);
    delete githubRepo.organization;
    delete githubRepo.owner;
    githubRepo.auto_init = true;
    githubRepo.license_template = config.github.default_license;
    githubRepo.homepage = 'https://ecosml.org/package/'+ecosmlId;

    let {response, body} = await github.createRepository(githubRepo);
    this.checkStatus(response, 201);

    pkg = Object.assign(pkg, utils.githubRepoToEcosml(body));
    pkg.id = ecosmlId;

    await mongo.insertPackage(pkg);
    await git.clone(pkg.name);

    // write and commit ecosis-metadata.json file
    await this.writeMetadataFile(pkg);
    await this.commitMetadataChanges(pkg.name);

    return pkg;
  }

  /**
   * @method update
   * @description update a package
   * 
   * @param {Object|string} pkg either pkg object, name or id
   * @param {Object} pkg package to update
   * @param {String} update.organization 
   * @param {String} update.overview package short description
   * @param {String} update.description package readme
   * @param {Array} update.keywords package keywords
   * @param {String} update.theme
   * @param {String} update.family
   * @param {String} update.specific
   * @param {String} commitMessage
   * @param {Boolean} refreshFromGithub preform a full refresh from Github API?
   */
  async update(pkg, update, commitMessage, refreshFromGithub = false) {
    pkg = this.get(pkg);

    // First update readme if it changed via git
    await git.resetHEAD(pkg.name);
    if( update.description && pkg.description !== update.description ) {
      let README = path.join(git.getRepoPath(pkg.name), 'README.md');
      await fs.writeFile(README, update.description || '');
    }
    
    // update package overview in github
    let body;
    
    if( update.overview && update.overview !== pkg.overview ) {
      let response = await github.editRepository({
        name : pkg.name,
        description : pkg.overview
      });
      body = response.body;
    }

    let gpkg = {};
      
    // grab current github api repo state if we didn't update
    if( refreshFromGithub ) {
      if( !body ) {
        let response = await github.getRepository(pkg.name);
        body = response.body;
      }
      gpkg = utils.githubRepoToEcosml(body);
    }

    config.schemaFilter.UPDATE_ATTRIBUTES.UPDATE_ATTRIBUTES.forEach(attr => {
      if( pkg[attr] !== undefined ) {
        gpkg[attr] = pkg[attr];
      }
    });

    // now save changes in mongo
    await mongo.updatePackage(pkg.name, gpkg);
    pkg = await mongo.getPackage(pkg.name);

    // write and commit ecosis-metadata.json file or other changes
    await this.writeMetadataFile(pkg);
    await this.commitMetadataChanges(pkg.name, commitMessage);

    return pkg;
  }

  /**
   * @method get
   * @description get a package by name or id.  If a package object is passed, it
   * is simply returned
   * 
   * @param {Object|String} pkg either package object, name or id
   * @param {Boolean} renderMarkdown do you want the description markdown rendered as HTML?
   * 
   * @return {Promise}
   */
  async get(pkg, renderMarkdown=false) {
    if( typeof pkg === 'object' ) return pkg;

    pkg = await mongo.getPackage(pkg);
    if( !pkg ) throw new Error('Unknown package: '+pkg);

    if( pkg.description && renderMarkdown ) {
      pkg.renderedDescription = await markdown(pkg.description);
    } else {
      pkg.renderedDescription = '';
    }

    return pkg;
  }

  /**
   * @method addFile
   * @description add file to package
   * 
   * @param {Object|String} pkg package object, name or id
   * @param {Object} file 
   * @param {String} file.filename
   * @param {String} file.buffer 
   * @param {String} file.dir
   * @param {String} file.message
   */
  async addFile(pkg, file) {
    pkg = await this.get(pkg);

    // update repo path
    await git.resetHEAD(pkg.name);

    // get full repo path name
    let packagepath = git.getRepoPath(pkg.name);
    let repoFilePath = path.join(packagepath, file.dir, file.filename);

    if( fs.existsSync(repoFilePath) ) {
      await fs.unlink(repoFilePath);
    }
    
    await fs.writeFile(repoFilePath, file.buffer);

    await commit(pkg.name, file.message || 'Updating package file');
  
    return this._getFileInfo(
      path.join(file.dir, file.filename)
    );
  }

  /**
   * @method deleteFile
   * @description delete a package file
   * 
   * @param {*} pkg package object, id or name
   * @param {String} filepath path to file in repo 
   * 
   * @returns {Promise}
   */
  async deleteFile(pkg, filepath) {
    pkg = await this.get(packageNameOrId);

    // update repo path
    await git.resetHEAD(pkg.name);

    // get full repo path name
    let packagepath = git.getRepoPath(pkg.name);
    let repoFilePath = path.join(packagepath, filepath);

    if( fs.existsSync(repoFilePath) ) {
      throw new Error('Package file does not exist: '+filepath);
    }

    await fs.unlink(repoFilePath);
    await commit(pkg.name, 'Removing package file');
  }

  /**
   * @method commit
   * @description commit change to a package to github
   * 
   * @param {String} packageName actual package name (not id)
   * @param {String} message commit message
   */
  async commit(packageName, message) {
    await git.addAll(packageName);
    await git.commit(packageName, message);
    return git.push(packageName);
  }

  /**
   * @method delete
   * @description delete a package
   */
  async delete(pkg) {
    pkg = this.get(pkg);

    logger.info(`Deleting package: ${pkg.names}`);

    let {response} = await github.deleteRepository(pkg.name);
    
    this.checkStatus(response, 204);

    await mongo.removePackage(pkg.name);
    await git.removeRepositoryFromDisk(pkg.name);
  }

  /**
   * @method createRelease
   * @description Create a new release
   * 
   * @param {Object|String} pkg package object, name or id
   * @param {Object} data release data
   * @param {String} data.name release name (v1.0.0)
   * @param {String} data.description release description
   * @param {Boolean} data.draft
   * @param {Boolean} data.prerelease
   */
  async createRelease(id, data) {
    pkg = this.get(pkg);


    if( !data.name ) throw new AppError('Release name required', AppError.ERROR_CODES.MISSING_ATTRIBUTE);
    if( !data.description ) throw new AppError('Release description required', AppError.ERROR_CODES.MISSING_ATTRIBUTE);
    
    if( pkg.releases ) {
      let exists = pkg.releases.find(release => release.name === data.name);
      if( exists ) throw new AppError(`Release ${data.name} already exists`, AppError.ERROR_CODES.INVALID_ATTRIBUTE);
    }
    
    let release = {
      tag_name : data.name,
      name : data.name,
      body : data.description,
      draft : data.draft ? true : false,
      prerelease : data.prerelease ? true : false
    }

    // create release on github
    let {response} = await github.createRelease(pkg.name, release);
    this.checkStatus(response, 201);
    response = JSON.parse(response.body);
    
    // clean up some stuff we don't care about
    response = utils.githubReleaseToEcosml(response);

    let releases = [];
    if( pkg.releases ) {
      releases = pkg.releases;
    }
    
    releases.push(response);
    pkg.releases = releases;

    // save release data
    await mongo.updatePackage(id, {releases});
    return pkg;
  }

  /**
   * @method writeMetadataFile
   * @description given a ecosml package object, write the git repo metadata file
   * 
   * @param {Object} pkg ecosml package object
   * @returns {Promise}
   */
  async writeMetadataFile(pkg) {
    let metadata = utils.ecosmlToMetadataFile(pkg);
    let filepath = path.join(git.getRepoPath(pkg.name), METADATA_FILENAME);
    await fs.writeFile(filepath, JSON.stringify(metadata, '  ', '  '));
  }

  /**
   * @method readMetadataFile
   * @description given a ecosml repo object, write the git repo metadata file
   * 
   * @param {String} repoName repo to read. must be already pulled to disk
   * @returns {Promise}
   */
  async readMetadataFile(repoName) {
    let filepath = path.join(git.getRepoPath(repoName), METADATA_FILENAME);
    let metadata = await fs.readFile(filepath, 'utf-8');
    return JSON.parse(metadata || {});
  }

  /**
   * @method commitMetadataChanges
   * @description see if changes were made, if so, commit them
   * 
   * @param {String} repoName repo to commit
   * @param {String} msg option message
   * 
   * @returns {Promise}
   */
  async commitMetadataChanges(repoName, msg) {
    let changes = await git.currentChangesCount(repoName);
    if( changes > 0 ) {
      await git.addAll(repoName);
      await git.commit(repoName, msg || 'Updating package metadata');
      await git.push(repoName);
    }
  }

    /**
   * @method getFiles
   * @description get all files for this repository
   * 
   * @param {Object|String} pkg package object, name or id
   * 
   * @returns {Promise} resolves to array
   */
  async getFiles(pkg) {
    pkg = await this.get(pkg);

    let dir = await git.ensureDir(pkg.name);
    return this._walkPackage(dir, dir);
  }

  async _walkPackage(root, dir, filelist = []) {
    let files = await fs.readdir(dir);

    for( let i = 0; i < files.length; i++ ) {
      let filename = files[i];
      if( filename.match(/^\./) ) continue;
      let file = path.join(dir, filename);

      let isDir = (await fs.statSync(file)).isDirectory();
      if( isDir ) {
        await this._walkPackage(root, file, filelist);
      } else {
        let info = this._getFileInfo(file.replace(new RegExp('^'+root), ''));
        filelist.push(info);
      }
    }

    return filelist;
  }

  /**
   * @method _getFileInfo
   * @description parse file info from file path
   * 
   * @param {String} path file path
   * 
   * @return {Object}
   */
  _getFileInfo(filepath) {
    let info = path.parse(filepath);
    info.filename = info.base;
    delete info.root;
    delete info.base;
    return info;
  }
}

module.exports = new PackageModel();