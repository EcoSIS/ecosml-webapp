const git = require('../lib/git');
const github = require('../lib/github');
const mongo = require('../lib/mongo');
const logger = require('../lib/logger');
const config = require('../lib/config');
const AppError = require('../lib/AppError');
const path = require('path');
const fs = require('fs-extra');
const uuid = require('uuid');


class RepoModel {

  constructor() {
    this.REQUIRED = {
      CREATE : ['name', 'description', 'owner', 'organization']
    }
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
   * @description create a repository
   * 
   * @param {Object} repo repository to create
   * @param {Object} repo.name repository name
   * @param {Object} repo.description repository short description
   * @param {Object} repo.organization repository owner org
   * @param {Object} repo.owner repository owner
   */
  async create(repo) {
    logger.info(`Creating repo: ${repo.name}`);
    this.verifyRequired(this.REQUIRED.CREATE, repo);

    // check access
    await this.checkAccess();

    if( repo.name.length < 4 ) throw new AppError('Repository name must be at least 4 characters', AppError.ERROR_CODES.INVALID_ATTRIBUTE);
    if( repo.description.length < 15 ) throw new AppError('Please provide a longer overview', AppError.ERROR_CODES.INVALID_ATTRIBUTE);

    let ecosmlId = uuid.v4();

    // create Github API Request
    let githubRepo = Object.assign({}, repo);
    delete githubRepo.organization;
    delete githubRepo.owner;
    githubRepo.auto_init = true;
    githubRepo.license_template = config.github.default_license;
    githubRepo.homepage = 'https://ecosml.org/package/'+ecosmlId;

    let {response, body} = await github.createRepository(githubRepo);
    this.checkStatus(response, 201);

    repo = this.transformGithubRepoResponse(body);
    repo.id = ecosmlId;

    await mongo.insertRepository(repo);
    await git.clone(repo.name);
    return repo;
  }

  async get(repoNameOrId) {
    return await mongo.getRepository(repoNameOrId);
  }

  /**
   * @method addFile
   * @description add file to repository
   * 
   * @param {Object} user 
   * @param {Object} options 
   * @param {String} options.filename
   * @param {String} options.filepath 
   * @param {String} options.repoName 
   * @param {String} options.repoPath 
   */
  async addFile(user, options) {

    // check access
    await this.checkAccess(user);

    // make repo path
    let repoPath = git.getRepoPath(options.repoName);
    fs.mkdirsSync(repoPath);

    // get full repo path name
    let repoFilePath = path.join(repoPath, options.filename);
    
    // move file
    await fs.move(options.filepath, repoFilePath);
  }

  async commit(repoName, message) {
    await git.addAll(repoName);
    await git.commit(repoName, message);
    return await git.push(repoName);
  }

  /**
   * @method delete
   * @description delete a repository
   */
  async delete(repoName) {
    if( !repoName ) throw new AppError('Repository name required', AppError.ERROR_CODES.MISSING_ATTRIBUTE);
    logger.info(`Deleting repo: ${repoName}`);

    let {response} = await github.deleteRepository(repoName);
    
    this.checkStatus(response, 204);

    await mongo.removeRepository(repoName);
    await git.removeRepository(repoName);
  }

  transformGithubRepoResponse(repo) {
    if( typeof repo === 'string' ) {
      repo = JSON.parse(repo);
    }

    return {
      githubId : repo.id,
      cloneUrl : repo.clone_url,
      createdAt : repo.created_at,
      overview : repo.description,
      downloadsUrl : repo.downloads_url,
      fullName : repo.full_name,
      gitUrl : repo.git_url,
      htmlUrl : repo.html_url,
      name : repo.name,
      private : repo.private,
      sshUrl : repo.ssh_url,
      updatedAt : repo.updated_at,
      pushedAt : repo.pushed_at
    }
  }

}

module.exports = new RepoModel();