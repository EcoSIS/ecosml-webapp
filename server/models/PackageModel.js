const git = require('../lib/git');
const github = require('../lib/github');
const mongo = require('../lib/mongo');
const logger = require('../lib/logger');
const config = require('../lib/config');
const AppError = require('../lib/AppError');
const path = require('path');
const fs = require('fs-extra');
const uuid = require('uuid');


class PackageModel {

  constructor() {
    this.REQUIRED = {
      CREATE : ['name', 'description', 'owner', 'organization']
    }

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
    this.verifyRequired(this.REQUIRED.CREATE, pkg);

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

    pkg = this.transformGithubRepoResponse(body);
    pkg.id = ecosmlId;

    await mongo.insertPackage(pkg);
    await git.clone(pkg.name);
    return pkg;
  }

  /**
   * @method update
   * @description update a package
   * 
   * @param {Object} pkg package to update
   * @param {String} pkg.name package name, does not change
   * @param {String} pkg.overview package short description
   * @param {String} pkg.description package readme
   * @param {Array} pkg.keywords package keywords
   */
  async update(pkg) {
    await git.resetHEAD(pkg.name);

    let cpkg = await mongo.getPackage(pkg.name);

    // First update readme if it changed via git
    if( pkg.description ) {
      let README = path.join(git.getRepoPath(pkg.name), 'README.md');
      await fs.writeFile(README, pkg.description || '');

      let changes = await git.currentChangesCount(pkg.name);
      if( changes > 0 ) {
        await git.addAll(pkg.name);
        await git.commit(pkg.name, 'Updating readme');
        await git.push(pkg.name);
      }
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

    // grab current github api repo state if we didn't update
    if( !body ) {
      let response = await github.getRepository(pkg.name);
      body = response.body;
    }

    let gpkg = this.transformGithubRepoResponse(body);
    gpkg.description = pkg.description;
    gpkg.keywords = pkg.keywords;

    // now save changes in mongo
    await mongo.updatePackage(pkg.name, gpkg);

    return mongo.getPackage(pkg.name);
  }

  /**
   * @method get
   * @description get a package by name or id
   * 
   * @param {String} packageNameOrId package name or id
   * @return {Promise}
   */
  async get(packageNameOrId) {
    return mongo.getPackage(packageNameOrId);
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
    await git.removeRepository(pkg.name);
  }

  transformGithubRepoResponse(repo) {
    if( typeof repo === 'string' ) {
      repo = JSON.parse(repo);
    }

    return {
      githubId : repo.id,
      cloneUrl : repo.clone_url,
      createdAt : new Date(repo.created_at),
      overview : repo.description,
      downloadsUrl : repo.downloads_url,
      fullName : repo.full_name,
      gitUrl : repo.git_url,
      htmlUrl : repo.html_url,
      name : repo.name,
      private : repo.private,
      sshUrl : repo.ssh_url,
      updatedAt : new Date(repo.updated_at),
      pushedAt : new Date(repo.pushed_at)
    }
  }
}

module.exports = new PackageModel();