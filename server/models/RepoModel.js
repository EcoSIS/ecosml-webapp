const git = require('../lib/git');
const github = require('../lib/github');
const mongo = require('../lib/mongo');
const logger = require('../lib/logger');
const config = require('../lib/config');


class RepoModel {

  constructor() {
    this.REQUIRED = {
      CREATE : ['name', 'description', 'owner', 'organization']
    }
  }

  verifyRequired(attrs, obj) {
    attrs.forEach(attr => {
      if( !obj[attr] ) throw new Error(`${attr} required`);
    });
  }

  checkStatus(response, expectedStatus) {
    if( response.statusCode !== expectedStatus ) {
      let body = response.body;
      try {
        body = JSON.parse(body).message
      } catch(e) {}

      throw new Error(body);
    }
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

    // check owner in org

    // create Github API Request
    let githubRepo = Object.assign({}, repo);
    delete githubRepo.organization;
    delete githubRepo.owner;
    githubRepo.auto_init = true;
    githubRepo.license_template = config.github.default_license;

    let {response} = await github.createRepository(githubRepo);

    this.checkStatus(response, 201);

    await mongo.insertRepository(repo);
    await git.clone(repo.name);
  }

  /**
   * @method delete
   * @description delete a repository
   */
  async delete(repoName) {
    logger.info(`Deleting repo: ${repoName}`);
    if( !repoName ) throw new Error('Repository name required');

    let {response} = await github.deleteRepository(repoName);
    
    this.checkStatus(response, 204);

    await mongo.removeRepository(repoName);
    await git.removeRepository(repoName);
  }

}

module.exports = new RepoModel();