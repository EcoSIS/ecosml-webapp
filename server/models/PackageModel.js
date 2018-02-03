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
   * @param {Object} pkg package to update
   * @param {String} pkg.name package name, does not change
   * @param {String} pkg.organization 
   * @param {String} pkg.overview package short description
   * @param {String} pkg.description package readme
   * @param {Array} pkg.keywords package keywords
   * @param {String} pkg.theme
   * @param {String} pkg.family
   * @param {String} pkg.specific
   * @param {String} commitMessage
   * @param {Boolean} refreshFromGithub preform a full refresh from Github API?
   */
  async update(pkg, commitMessage, refreshFromGithub = false) {
    if( !pkg.name ) throw new AppError(AppError.ERROR_CODES.MISSING_ATTRIBUTE, 'name required');

    let cpkg = await mongo.getPackage(pkg.name);

    // First update readme if it changed via git
    await git.resetHEAD(pkg.name);
    if( pkg.description !== cpkg.description ) {
      let README = path.join(git.getRepoPath(pkg.name), 'README.md');
      await fs.writeFile(README, pkg.description || '');
    }
    
    // update package overview in github
    let body;
    
    if( cpkg.overview !== pkg.overview ) {
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
   * @description get a package by name or id
   * 
   * @param {String} packageNameOrId package name or id
   * @return {Promise}
   */
  async get(packageNameOrId) {
    let pkg = await mongo.getPackage(packageNameOrId);
    if( pkg.description ) {
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
   * @param {Object} user 
   * @param {Object} options 
   * @param {String} options.filename
   * @param {String} options.filepath 
   * @param {String} options.packagename 
   * @param {String} options.packagepath 
   */
  async addFile(user, options) {

    // check access
    await this.checkAccess(user);

    // make repo path
    let packagepath = git.getRepoPath(options.packagename);
    fs.mkdirsSync(packagepath);

    // get full repo path name
    let repoFilePath = path.join(packagepath, options.filename);
    
    // move file
    await fs.move(options.filepath, repoFilePath);
  }

  async commit(packageName, message) {
    await git.addAll(packageName);
    await git.commit(packageName, message);
    return await git.push(packageName);
  }

  /**
   * @method delete
   * @description delete a package
   */
  async delete(packageNameOrId) {
    if( !packageNameOrId ) throw new AppError('Package name or id required', AppError.ERROR_CODES.MISSING_ATTRIBUTE);
    logger.info(`Deleting package: ${packageNameOrId}`);

    // in case name is actually an id
    let pkg = await this.get(packageNameOrId);

    let {response} = await github.deleteRepository(pkg.name);
    
    this.checkStatus(response, 204);

    await mongo.removePackage(pkg.name);
    await git.removeRepositoryFromDisk(pkg.name);
  }

  /**
   * @method createRelease
   * @description Create a new release
   * 
   * @param {String} id package id
   * @param {Object} data release data
   * @param {String} data.name release name (v1.0.0)
   * @param {String} data.description release description
   * @param {Boolean} data.draft
   * @param {Boolean} data.prerelease
   */
  async createRelease(id, data) {
    if( !id ) throw new AppError('Package id required', AppError.ERROR_CODES.MISSING_ATTRIBUTE);
    if( !data.name ) throw new AppError('Release name required', AppError.ERROR_CODES.MISSING_ATTRIBUTE);
    if( !data.description ) throw new AppError('Release description required', AppError.ERROR_CODES.MISSING_ATTRIBUTE);
    
    let pkg = await this.get(id);
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
   * @description given a ecosml repo object, write the git repo metadata file
   * 
   * @param {Object} repo ecosml repo object
   * @returns {Promise}
   */
  async writeMetadataFile(repo) {
    let metadata = utils.ecosmlToMetadataFile(repo);
    let filepath = path.join(git.getRepoPath(repo.name), METADATA_FILENAME);
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
}

module.exports = new PackageModel();