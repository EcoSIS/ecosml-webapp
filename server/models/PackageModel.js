const git = require('../lib/git');
const github = require('../lib/repository/github');
const repository = require('../lib/repository');
const mongo = require('../lib/mongo');
const logger = require('../lib/logger');
const config = require('../lib/config');
const AppError = require('../lib/AppError');
const path = require('path');
const fs = require('fs-extra');
const uuid = require('uuid');
const utils = require('../lib/utils')
const redis = require('../lib/redis');
const markdown = require('../lib/markdown');
const schema = require('../lib/schema');
const initPackage = require('../lib/init-package-files');
const hash = require('../lib/hash');
// const travis = require('./PackageTestModel');
const registeredRepositories = require('../lib/registered-repositories');

const METADATA_FILENAME = 'ecosml-metadata.json';

class PackageModel {

  constructor() {
    git.initConfig();
  }

  checkStatus(response, expectedStatus) {
    if( response.statusCode !== expectedStatus ) {
      let body = response.body;
      try {
        body = JSON.parse(body).message
      } catch(e) {}

      throw new AppError(response.statusCode+': '+body, AppError.ERROR_CODES.BAD_API_RESPONSE);
    }
  }

  /**
   * @method create
   * @description create a package
   * 
   * @param {Object} pkg package to create
   * @param {String} pkg.name package name
   * @param {String} pkg.overview package short description
   * @param {String} pkg.organization package owner org
   * @param {String} pkg.owner package owner
   * @param {String} username optional username
   */
  async create(pkg, username) {
    logger.info(`Creating package: ${pkg.name}`);

    let ecosmlId = uuid.v4();

    if( pkg.source === 'registered' ) {
      // fake some of the github api properties
      pkg.htmlUrl = repository.getHost(pkg.host)+'/'+pkg.repoOrg+'/'+pkg.name;
      pkg.private = false;

      await registeredRepositories.syncProperties(pkg);
      
      // ensure this repo exists and we can access
      let exists = await repository.exists(pkg.host, pkg.name, pkg.repoOrg);
      if( !exists ) throw new Error('Repository does not exist: '+pkg.name);

      let ePkg = await mongo.getPackage(pkg.host+'/'+pkg.repoOrg+'/'+pkg.name);
      if( ePkg ) throw new Error('Repository already registered: '+pkg.host+'/'+pkg.repoOrg+'/'+pkg.name);

      pkg.fullName = pkg.host+'/'+pkg.repoOrg+'/'+pkg.name;

      // check things look ok
      schema.validate('create', pkg);

    } else if( pkg.source === 'managed' ) {
      pkg.repoOrg = config.github.org;
      pkg.host = 'github';
      pkg.fullName = pkg.host+'/'+pkg.organization+'/'+pkg.name;

      schema.validate('create', pkg);

      // create Github API Request
      let githubRepo = Object.assign({}, pkg);
      delete githubRepo.organization;
      delete githubRepo.owner;
      githubRepo.auto_init = true;
      githubRepo.license_template = config.github.default_license;
      githubRepo.homepage = config.github.homepageRoot+ecosmlId;

      // check if name exists
      let ePkg = await mongo.getPackage('github/'+config.github.org+'/'+pkg.name);
      if( ePkg ) throw new Error('Repository already registered: '+pkg.name);

      // ecosis overview === github description
      githubRepo.description = githubRepo.overview;
      delete githubRepo.overview;
      let {response, body} = await github.createRepository(githubRepo);
      this.checkStatus(response, 201);

      pkg = Object.assign(pkg, utils.githubRepoToEcosml(body));
      pkg.releaseCount = 0;
    }

    pkg.id = ecosmlId;
    await mongo.insertPackage(pkg);

    await this.syncRepoBranchName(pkg, true);
    
    if( pkg.source === 'managed' ) {
      await git.clone(pkg.repoOrg, pkg.name);
      await initPackage(pkg);

      // write and commit ecosis-metadata.json file
      await this.writeMetadataFile(pkg);
      await this.commit(pkg.repoOrg, pkg.name, 'Updating package metadata', username);

      // let travis know about the repo (sync with it)
      // await travis.initRepo(pkg.name);

      // add github team access
      if( pkg.organization ) {
        let team = mongo.getGithubTeam(pkg.organization);
        if( team ) {
          await github.addTeamRepo(team.id, pkg.name);
        }
      }
    }

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
   * @param {String} username
   * @param {Boolean} refreshFromGithub preform a full refresh from Github API?
   */
  async update(pkg, update, commitMessage, username, refreshFromGithub = false) {
    pkg = await this.get(pkg);
    schema.validate('update', update, pkg.source);

    if( pkg.organizationInfo ) delete pkg.organizationInfo;

    // don't allow user to update repo type (source)
    update.source = pkg.source;
    update.name = pkg.name;
    update.fullName = pkg.fullName;
    update.repoOrg = pkg.repoOrg;
    update.host = pkg.host;
    update.htmlUrl = pkg.htmlUrl;

    let gpkg = {};

    if( pkg.source === 'managed' ) {
      // first get in sync
      try { 
        await git.resetHEAD(pkg.repoOrg, pkg.name, pkg.defaultBranch);
        await git.clean(pkg.repoOrg, pkg.name);
        await git.pull(pkg.repoOrg, pkg.name);
      } catch(e) {
        logger.error('Failed to pull repo, re-cloning', e);
        await git.clone(pkg.repoOrg, pkg.name);
      }

      // update readme if it changed via git
      if( update.description && pkg.description !== update.description ) {
        let README = path.join(git.getRepoPath(pkg.repoOrg, pkg.name), 'README.md');
        await fs.writeFile(README, update.description || '');
      }

      // make sure the org didn't change
      if( update.organization && pkg.organization !== update.organization ) {
        let newTeam = await mongo.getGithubTeam(update.organization);
        let oldTeam = await mongo.getGithubTeam(pkg.organization);

        if( oldTeam ) {
          await github.removeTeamRepo(oldTeam.id, pkg.name);
        } else {
          logger.error(`Unable to find github team ${pkg.organization} to remove repo: ${pkg.name}`);
        }

        if( newTeam ) {
          await github.addTeamRepo(newTeam.id, pkg.name);
        } else {
          logger.error(`Unable to find github team ${update.organization} to add repo: ${pkg.name}`);
        }
      }
      
      // update package overview in github
      let body;
      if( update.overview && update.overview !== pkg.overview ) {
        let response = await github.editRepository(pkg.repoOrg, {
          name : pkg.name,
          description : update.overview
        });
        body = response.body;
      }
        
      // grab current github api repo state if we didn't update
      if( refreshFromGithub ) {
        if( !body ) {
          let response = await github.getRepository(pkg.name);
          body = response.body;
        }
        gpkg = utils.githubRepoToEcosml(body);
      }

      gpkg = Object.assign(gpkg, update);

      // make sure release count is correct
      pkg.releaseCount = (pkg.releases || []).length;
    } else if ( pkg.source === 'registered' ) {
      await registeredRepositories.syncProperties(update);
      gpkg = Object.assign(gpkg, update);
    }

    // now save changes in mongo
    await mongo.updatePackage(pkg.id, gpkg);
    pkg = await mongo.getPackage(pkg.id);

    await this.syncRepoBranchName(pkg);

    if( pkg.source === 'managed' ) {
      // write and commit ecosis-metadata.json file or other changes
      await this.writeMetadataFile(pkg);
      await this.commit(pkg.repoOrg, pkg.name, commitMessage || 'Updating package metadata', username);
    } else {
      // this._updateRegisteredRepo(pkg);
    }

    return pkg;
  }

  /**
   * @method syncRepoBranchName
   * @description ensure the correct default branch name is set for repository
   * 
   * @param {Object} pkg 
   * 
   * @returns {Promise} Resolves to string
   */
  async syncRepoBranchName(pkg, clean) {
    // make sure we have the correct repo
    let defaultBranch = await git.defaultBranchName(
      repository.getHost(pkg.host), 
      pkg.repoOrg, 
      pkg.name,
      {clean}
    );

    await mongo.updatePackage(pkg.id, {defaultBranch});
    pkg.defaultBranch = defaultBranch;

    return defaultBranch;
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
  async get(pkg, opts={}) {
    let pkgObj;

    if( typeof opts === 'boolean' ) {
      opts = {
        renderMarkdown : opts
      }
    }

    if( opts.renderMarkdown === undefined ) opts.renderMarkdown = false;
    
    pkgObj = await mongo.getPackage(pkg);

    if( !pkgObj ) throw new Error('Unknown package: '+pkg);

    if( pkgObj.description && opts.renderMarkdown ) {
      pkgObj.renderedDescription = await markdown(pkgObj.description, pkgObj.id);
    } else {
      pkgObj.renderedDescription = '';
    }

    if( pkgObj.organization ) {
      let info = await redis.client.get(redis.createOrgKey(pkg.organization));
      if( info ) pkgObj.organizationInfo = JSON.parse(info);
    }

    // this only gets the applied/minted dois
    // use the DoiModel for pending/requesting dois
    pkgObj.dois = await mongo.getAppliedPackageDois(pkgObj.id);

    // default
    if( !pkgObj.source ) {
      pkgObj.source = 'managed';
    }

    return pkgObj;
  }

  /**
   * @method updateFiles
   * @description add, update and/or remove multiple package files.  
   * 
   * @param {Object|String} pkg package object, name or id
   * @param {Array} updateFiles 
   * @param {String} updateFiles[].repoFilePath
   * @param {String} updateFiles[].tmpFile either current path or use buffer option
   * @param {String} updateFiles[].buffer use if tmp file path not provided
   * @param {Array} removeFiles file paths to remove
   * @param {String} message
   * @param {String} username
   */
  async updateFiles(pkg, updateFiles=[], removeFiles=[], message, username) {
    pkg = await this.get(pkg);

    if( pkg.source !== 'managed' ) {
      throw new Error(`${pkg.name} is not a managed repository`);
    }

    // update repo path
    await git.resetHEAD(pkg.repoOrg, pkg.name, pkg.defaultBranch);
    let repoPath = git.getRepoPath(pkg.repoOrg, pkg.name);

    let result = [];
    for( let i = 0; i < updateFiles.length; i++ ) {
      let file = updateFiles[i];

      let filePath = path.join(repoPath, file.repoFilePath);
      let baseFileDir = path.parse(filePath).dir;
      // if this is the main or resources directory, move files to correct location
     
      await fs.mkdirs(baseFileDir);

      if( fs.existsSync(filePath) ) {
        await fs.unlink(filePath);
      }
      
      if( file.buffer ) {
        await fs.writeFile(filePath, file.buffer);
      } else if( file.tmpFile ) {
        await fs.move(file.tmpFile, filePath);
      }

      result.push(this._getFileInfo(filePath, pkg));
    }

    for( let i = 0; i < removeFiles.length; i++ ) {
      let file = removeFiles[i];
      let filePath = path.join(config.github.fsRoot, pkg.name, file);
      if( fs.existsSync(filePath) ) {
        await fs.unlink(filePath);
      }
    }

    await this.commit(pkg.repoOrg, pkg.name, message || 'Updating package files', username);
  
    return this.getFiles(pkg);
  }

  /**
   * @method delete
   * @description delete a package
   */
  async delete(pkg) {
    pkg = await this.get(pkg);

    logger.info(`Deleting package: ${pkg.name}`);

    if( pkg.source === 'managed') {
      let {response} = await github.deleteRepository(pkg.name);
      this.checkStatus(response, 204);
    }

    await mongo.removePackage(pkg.id);
    await git.removeRepositoryFromDisk(pkg.repoOrg, pkg.name);

    // if( pkg.source === 'registered' ) {
    //   this._updateRegisteredRepo(pkg, true);
    // }
  }

  /**
   * @method syncRegisteredRepository
   * @description update overview, description and release attributes from
   * github.
   * 
   * @param {String|Object} pkg pkg object or string name/id 
   */
  async syncRegisteredRepository(pkg) {
    pkg = await this.get(pkg);
    if( pkg.source !== 'registered' ) {
      throw new Error('Must be a registered repository');
    }

    return registeredRepositories.syncPropertiesToMongo(pkg.host, pkg.repoOrg, pkg.name);
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
  async createRelease(pkg, data) {
    pkg = await this.get(pkg);
    if( pkg.source !== 'managed' ) {
      throw new Error(`${pkg.name} is not a managed repository`);
    }

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
    let {response} = await github.createRelease(pkg.repoOrg, pkg.name, release);
    if( response.statusCode !== 201 ) {
      let body = JSON.parse(response.body);
      if( body.errors && body.errors.length ) {
        if( body.errors[0].code === 'already_exists' ) {
          throw new AppError('Release already exists', AppError.ERROR_CODES.BAD_API_RESPONSE);
        }
      }
    }
    this.checkStatus(response, 201);
    response = JSON.parse(response.body);
    
    // clean up some stuff we don't care about
    response = utils.githubReleaseToEcosml(response);


    let releases = pkg.releases || [];
    releases.push(response);
    pkg.releases = releases;

    let releaseCount = releases.length; 

    // save release data
    await mongo.updatePackage(pkg.id, {releases, releaseCount});
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
    let filepath = path.join(git.getRepoPath(pkg.repoOrg, pkg.name), METADATA_FILENAME);
    await fs.writeFile(filepath, JSON.stringify(metadata, '  ', '  '));
  }

  /**
   * @method readMetadataFile
   * @description given a ecosml repo object, write the git repo metadata file
   * 
   * @param {String} repoOrg
   * @param {String} repoName repo to read. must be already pulled to disk
   * 
   * @returns {Promise}
   */
  // async readMetadataFile(repoOrg, repoName) {
  //   let filepath = path.join(git.getRepoPath(repoOrg, repoName), METADATA_FILENAME);
  //   let metadata = await fs.readFile(filepath, 'utf-8');
  //   return JSON.parse(metadata || {});
  // }

  /**
   * @method commit
   * @description commit change to a package to github
   * 
   * @param {String} repoOrg
   * @param {String} packageName actual package name (not id)
   * @param {String} message commit message
   * @param {String} username
   */
  async commit(repoOrg, packageName, message, username) {
    let changes = await git.currentChangesCount(repoOrg, packageName);
    if( changes === 0 ) {
      logger.warn(`Package ${packageName} committing: told to commit, but no changes have been made`);
      return;
    }
    
    logger.debug(`Package ${packageName} committing: ${changes} change(s)`);
    
    var {stdout, stderr} = await git.addAll(repoOrg, packageName);
    logger.debug(`Package ${packageName} add --all`, stdout, stderr);

    var {stdout, stderr} = await git.commit(repoOrg, packageName, message, username);
    logger.debug(`Package ${packageName} commit`, stdout, stderr);

    var {stdout, stderr} = await git.push(repoOrg, packageName);
    logger.debug(`Package ${packageName} push`, stdout, stderr);
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

    if( pkg.source !== 'managed' ) {
      throw new Error(`${pkg.name} is not a managed repository`);
    }

    let dir = await git.ensureDir(pkg.repoOrg, pkg.name);
    return this._walkPackage(dir, dir, [], pkg);
  }

  async _walkPackage(root, dir, filelist = [], pkg) {
    let files = await fs.readdir(dir);

    for( let i = 0; i < files.length; i++ ) {
      let filename = files[i];
      if( filename.match(/^\./) ) continue;
      let file = path.join(dir, filename);

      let isDir = (await fs.statSync(file)).isDirectory();
      if( isDir ) {
        await this._walkPackage(root, file, filelist, pkg);
      } else {
        let repoPath = file.replace(new RegExp('^'+root), '');
        let info = this._getFileInfo(repoPath, pkg);
        info.sha256 = await hash(file);
        info.size = fs.statSync(file).size;
        filelist.push(info);
      }
    }

    return filelist;
  }

  /**
   * @method isNameAvailable
   * @description is a package name available
   * 
   * @param {String} host 
   * @param {String} packageName package name
   * @param {String} repoOrg Optional.  Defaults to EcoSML
   * 
   * @returns {Promise} resolves to Boolean
   */
  async isNameAvailable(host, packageName, repoOrg) {
    let available = !(await repository.exists(host, packageName, repoOrg));
    if( !available ) return {isAvailable: false, message: 'Unable to access'};

    let exists = await repository.exists(host, packageName, repoOrg);
    if( exists ) {
      return {isAvailable: false, message: 'Already registered'};
    }

    return {isAvailable: true};
  }

    /**
   * @method isValidRepository
   * @description is a package host/name/org valid?  ie it exists
   * 
   * @param {String} host 
   * @param {String} packageName package name
   * @param {String} org Optional.  Defaults to EcoSML
   * 
   * @returns {Promise} resolves to Boolean
   */
  async isValidRepository(host, packageName, org) {
    let exists = await repository.exists(host, packageName, org);
    if( !exists ) {
      return {valid: false, message: 'Repository does not exist or is inaccessible'};
    }

    return {valid: true};
  }

  /**
   * @method getNameAndRepoOrg
   * @description given a package name, return the organization
   * and repository name.
   * 
   * @param {String} pkgName 
   * 
   * @returns {Object}
   */
  getNameAndRepoOrg(pkgName) {
    if( pkgName.match('/') ) {
      pkgName = pkgName.split('/');
      return {
        repoOrg : pkgName[0],
        name : pkgName[1]
      }
    }

    throw new Error('Unknown repo org: '+pkgName)
  }

  /**
   * @method _updateRegisteredRepo
   * @description wrapper around registeredRepositories.update.  We want to catch and
   * notify logs of errors, but we don't want to make users wait for this.  So don't
   * await on this function call.  Will catch failure and log.
   * 
   * @param {Object} pkg 
   * 
   * @returns {Promise}
   */
  // async _updateRegisteredRepo(pkg, remove) {
  //   try {
  //     if( remove ) await registeredRepositories.remove(pkg);
  //     else await registeredRepositories.update(pkg);
  //   } catch(e) {
  //     logger.error(e);
  //   }
  // }

  /**
   * @method _getFileInfo
   * @description parse file info from file path
   * 
   * @param {String} path file path
   * 
   * @return {Object}
   */
  _getFileInfo(filepath, pkg) {
    let info = path.parse(filepath);
    info.filename = info.base;
    delete info.root;
    delete info.base;
    return info;
  }

  /**
   * @method _sanitizeFilename
   * @description make sure a filename is just that, a filename.  no crazy path
   * 
   * @param {String} filename
   * 
   * @return {String}
   */
  _sanitizeFilename(filename) {
    return path.parse(filename).base;
  }

  /**
   * @method _sanitizePath
   * @description make sure a path is just a local path, no '..'.
   * 
   * @param {String} pathname
   * 
   * @return {String}
   */
  _sanitizePath(pathname) {
    return pathname.replace(/\.\.\.*\/?/g, '');
  }

  _sanitizeExampleName(pathname) {
    return pathname
            .replace(/( |-)/g, '_')
            .replace(/\W/g, '');
  }

}

module.exports = new PackageModel();