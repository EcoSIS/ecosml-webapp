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
const schema = require('../lib/schema');
const initPackage = require('../lib/init-package');
const layouts = require('../lib/package-layout');
const hash = require('../lib/hash');
const travis = require('./PackageTestModel');

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

      throw new AppError(body, AppError.ERROR_CODES.BAD_API_RESPONSE);
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
    schema.validate('create', pkg);

    let ecosmlId = uuid.v4();

    // create Github API Request
    let githubRepo = Object.assign({}, pkg);
    delete githubRepo.organization;
    delete githubRepo.owner;
    githubRepo.auto_init = true;
    githubRepo.license_template = config.github.default_license;
    githubRepo.homepage = config.github.homepageRoot+ecosmlId;

    // ecosis overview === github description
    githubRepo.description = githubRepo.overview;
    delete githubRepo.overview;

    let {response, body} = await github.createRepository(githubRepo);
    this.checkStatus(response, 201);

    pkg = Object.assign(pkg, utils.githubRepoToEcosml(body));
    pkg.releaseCount = 0;
    pkg.id = ecosmlId;

    await mongo.insertPackage(pkg);
    await git.clone(pkg.name);

    // let layout = this._getPackageLayout(pkg.language);
    // await layout.ensureLayout(pkg);
    await initPackage(pkg);

    // write and commit ecosis-metadata.json file
    await this.writeMetadataFile(pkg);
    await this.commit(pkg.name, 'Updating package metadata', username);

    // let travis know about the repo (sync with it)
    await travis.initRepo(pkg.name);

    // add github team access
    if( pkg.organization ) {
      let team = mongo.getGithubTeam(pkg.organization);
      if( team ) {
        await github.addTeamRepo(team.id, pkg.name);
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
    schema.validate('update', update);

    // first get in sync
    await git.resetHEAD(pkg.name);
    await git.clean(pkg.name);
    await git.pull(pkg.name);

    // update readme if it changed via git
    if( update.description && pkg.description !== update.description ) {
      let README = path.join(git.getRepoPath(pkg.name), 'README.md');
      await fs.writeFile(README, update.description || '');
    }

    // make sure the org didn't change
    if( update.organization && pkg.organization !== update.organization ) {
      let newTeam = mongo.getGithubTeam(update.organization);
      let oldTeam = mongo.getGithubTeam(pkg.organization);

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
      let response = await github.editRepository({
        name : pkg.name,
        description : update.overview
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

    gpkg = Object.assign(gpkg, update);

    // if we changed layout, revert to basic layout
    if( gpkg.language && gpkg.language !== pkg.language ) {
      let layout = this._getPackageLayout(gpkg.language);
      await layout.undoLayout(pkg);
    }

    // make sure release count is correct
    pkg.releaseCount = (pkg.releases || []).length;

    // now save changes in mongo
    await mongo.updatePackage(pkg.name, gpkg);
    pkg = await mongo.getPackage(pkg.name);

    // ensure our current language package layout is in place
    let layout = this._getPackageLayout(pkg.language);
    await layout.ensureLayout(pkg);

    // write and commit ecosis-metadata.json file or other changes
    await this.writeMetadataFile(pkg);
    await this.commit(pkg.name, commitMessage || 'Updating package metadata', username);

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
    let pkgObj;
    
    if( typeof pkg === 'object' ) {
      pkgObj = pkg;
    } else {
      pkgObj = await mongo.getPackage(pkg);
    }

    if( !pkgObj ) throw new Error('Unknown package: '+pkg);

    if( pkgObj.description && renderMarkdown ) {
      pkgObj.renderedDescription = await markdown(pkgObj.description);
    } else {
      pkgObj.renderedDescription = '';
    }

    return pkgObj;
  }

  /**
   * @method addFile
   * @description add file to package
   * 
   * @param {Object|String} pkg package object, name or id
   * @param {Object} file 
   * @param {String} file.filename
   * @param {String} file.tmpFile 
   * @param {String} file.dir
   * @param {String} file.message
   */
  async addFile(pkg, file) {
    pkg = await this.get(pkg);

    // update repo path
    await git.resetHEAD(pkg.name);

    // if this is the main or resources directory, move files to correct location
    let dir = this._sanitizePath(file.dir);
    let pkgLayout = this._getPackageLayout(pkg.language);
    let baseFileDir = pkgLayout.genericToAbsLangPath(dir, pkg);

    await this._initExampleDir(dir, pkg);

    await fs.mkdirs(baseFileDir);

    let repoFilePath = path.join(baseFileDir, file.filename);

    if( fs.existsSync(repoFilePath) ) {
      await fs.unlink(repoFilePath);
    }
    
    if( file.buffer ) {
      await fs.writeFile(repoFilePath, file.buffer);
    } else if( file.tmpFile ) {
      await fs.move(file.tmpFile, repoFilePath);
    }

    await this.commit(pkg.name, file.message || 'Updating package file');
  
    return this._getFileInfo(
      path.join(file.dir, file.filename),
      pkg
    );
  }

  /**
   * @method updateFiles
   * @description add, update and/or remove multiple package files
   * 
   * @param {Object|String} pkg package object, name or id
   * @param {Array} updateFiles 
   * @param {String} updateFiles[].repoFilePath
   * @param {String} updateFiles[].tmpFile 
   * @param {String} updateFiles[].buffer
   * @param {Array} removeFiles file paths to remove
   * @param {String} message
   * @param {String} username
   */
  async updateFiles(pkg, updateFiles=[], removeFiles=[], message, username) {
    pkg = await this.get(pkg);

    // update repo path
    await git.resetHEAD(pkg.name);

    let result = [];
    for( let i = 0; i < updateFiles.length; i++ ) {
      let file = updateFiles[i];

      let filePath = path.join(config.github.fsRoot, pkg.name, file.repoFilePath);
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

    await this.commit(pkg.name, message || 'Updating package files', username);
  
    return this.getFiles(pkg);
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
    pkg = await this.get(pkg);
    filepath = this._sanitizePath(filepath);

    // get full repo path name
    filepath = this._sanitizePath(filepath);
    let pkgLayout = this._getPackageLayout(pkg.language);
    let repoFilePath = pkgLayout.genericToAbsLangPath(filepath, pkg);

    // update repo path
    await git.resetHEAD(pkg.name);

    if( !fs.existsSync(repoFilePath) ) {
      throw new Error('Package file does not exist: '+filepath);
    }

    await fs.unlink(repoFilePath);
    await this.commit(pkg.name, 'Removing package file');
  }

  /**
   * @method delete
   * @description delete a package
   */
  async delete(pkg) {
    pkg = await this.get(pkg);

    logger.info(`Deleting package: ${pkg.name}`);

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
  async createRelease(pkg, data) {
    pkg = await this.get(pkg);

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
    await mongo.updatePackage(pkg.name, {releases, releaseCount});
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
   * @method commit
   * @description commit change to a package to github
   * 
   * @param {String} packageName actual package name (not id)
   * @param {String} message commit message
   * @param {String} username
   */
  async commit(packageName, message, username) {
    let changes = await git.currentChangesCount(packageName);
    if( changes === 0 ) {
      logger.debug(`Package ${packageName} committing: told to commit, but no changes have been made`);
      return;
    }
    
    logger.debug(`Package ${packageName} committing: ${changes} change(s)`);
    
    var {stdout, stderr} = await git.addAll(packageName);
    logger.debug(`Package ${packageName} add --all`, stdout, stderr);

    var {stdout, stderr} = await git.commit(packageName, message, username);
    logger.debug(`Package ${packageName} commit`, stdout, stderr);

    var {stdout, stderr} = await git.push(packageName);
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

    let dir = await git.ensureDir(pkg.name);
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

  async getLayoutFolders(pkg) {
    pkg = await this.get(pkg);
    let layout = this._getPackageLayout(pkg.language);
    let re = new RegExp('^'+path.join(config.github.fsRoot, pkg.name));

    return {
      papers : '/papers',
      examples : layout.getExamplesDir(pkg.name).replace(re, ''),
      main : layout.getMainDir(pkg.name).replace(re, ''),
      resources : layout.getResourcesDir(pkg.name).replace(re, '')
    }
  }

  /**
   * @method _initExampleDir
   * @description if this is the first file being added to an 
   * example, run the init scripts
   * 
   * 
   **/    
  async _initExampleDir(dir, pkg) {
    dir = dir.replace(/^\//, '').split('/');
    if( dir.length < 2 ) return;
    let exampleName = dir[1];
    dir = dir.splice(0, 2).join('/');
    dir = path.join(git.getRepoPath(pkg.name), dir);

    if( !fs.existsSync(path) ) {
      let pkgLayout = this._getPackageLayout(pkg.language);
      await pkgLayout.ensureExampleLayout(pkg.name, exampleName);
    }
  }

  /**
   * @method deleteExample
   * @description move examples
   */
  async deleteExample(pkg, name) {
    let dir = await git.ensureDir(pkg.name);
    name = this._sanitizeExampleName(name);
    dir = path.join(dir, 'examples', name);

    if( !fs.existsSync(dir) ) {
      throw new Error('Example directory does not exist: '+path.join('examples', name));
    }
    
    await fs.remove(dir);

    return this.commit(pkg.name, `Deleting example ${name}`);
  }

  /**
   * @method moveExample
   * @description move examples
   */
  async moveExample(pkg, src, dst) {
    let dir = await git.ensureDir(pkg.name);

    let srcName = src;
    let dstName = dst;

    src = this._sanitizeExampleName(src);
    dst = this._sanitizeExampleName(dst);

    src = path.join(dir, 'examples', src);
    dst = path.join(dir, 'examples', dst);

    if( !fs.existsSync(src) ) {
      throw new Error('Source directory does not exist: '+path.join('examples', src));
    }
    if( fs.existsSync(dst) ) {
      throw new Error('Destination directory already exists: '+path.join('examples', dst));
    }

    await fs.move(src, dst);

    return this.commit(pkg.name, `Renaming example: ${srcName} to ${dstName}`);
  }

  /**
   * @method _getPackageLayout
   * @description get a package layout for a specific language
   * 
   * @param {String} language language for package
   * 
   * @returns {Object}
   */
  _getPackageLayout(language = 'basic') {
    if( layouts[language] ) return layouts[language];
    return layouts.basic;
  }

  /**
   * @method _getFileInfo
   * @description parse file info from file path
   * 
   * @param {String} path file path
   * 
   * @return {Object}
   */
  _getFileInfo(filepath, pkg) {
    // let pkgLayout = this._getPackageLayout(pkg.language);

    let info = path.parse(filepath);
    info.filename = info.base;
    // info.dir = pkgLayout.langPathToGeneric(info.dir, pkg);
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