const { exec } = require('child_process');
const fs = require('fs-extra');
const config = require('./config');
const utils = require('./utils');
const path = require('path');
const GITHUB_ACCESS = config.github.access;

const ROOT = config.github.fsRoot;
const BASE_URL = `https://${GITHUB_ACCESS.username}:${GITHUB_ACCESS.token}@github.com`;

if( !fs.existsSync(ROOT) ) {
  fs.mkdirpSync(ROOT);
}

class GitCli {

  constructor() {
    this.rootDir = ROOT;
  }

  /**
   * @method initConfig
   * @description make sure the git config username/email is set correctly
   */
  async initConfig() {
    await this.exec(`config --global user.email "${config.git.email}"`);
    await this.exec(`config --global user.name "${config.git.name}"`);
    await this.exec(`config --global push.default matching`);
  }

  /**
   * @method clone
   * @description clone a ecosml repository
   * @param {String} repoName 
   * 
   * @return {Promise}
   */
  async clone(repoName) {
    var {repoName, org} = utils.getRepoNameAndOrg(repoName);
    await this.removeRepositoryFromDisk(repoName);
    let url = BASE_URL+'/'+org+'/'+repoName;
    let orgDir = path.join(ROOT, org);
    await this.exec(`clone ${url}`, {cwd: orgDir});
  }

    /**
   * @method ensureDir
   * @description make sure a respository has been pulled onto server, if it 
   * hasn't, runs clone(repoName)
   * @param {String} repoName 
   * 
   * @return {Promise}
   */
  async ensureDir(repoName) {
    let dir = this.getRepoPath(repoName);

    let orgDir = path.resolve(dir, '..');
    if( !fs.existsSync(orgDir) ) {
      await fs.mkdirp(orgDir);
    }

    if( !fs.existsSync(dir) ) {
      await this.clone(repoName);
    }
    return dir;
  }

  /**
   * @method getRepoPath
   * @description the full path to a repository on disk
   * @param {String} repoName name of repository
   * 
   * @returns {String} full path 
   */
  getRepoPath(repoName) {
    var {repoName, org} = utils.getRepoNameAndOrg(repoName);
    return path.join(ROOT, org, repoName);
  }

  /**
   * @method pull
   * @description pull a respository
   * @param {String} repoName name of repository
   * 
   * @returns {Promise} 
   */
  async pull(repoName) {
    let dir = await this.ensureDir(repoName);
    return this.exec(`pull`, {cwd: dir});
  }

  /**
   * @method push
   * @description push a respository
   * @param {String} repoName name of repository
   * 
   * @returns {Promise} 
   */
  async push(repoName) {
    let dir = await this.ensureDir(repoName);
    return this.exec(`push`, {cwd: dir});
  }

  /**
   * @method resetHEAD
   * @description reset a repository to local HEAD
   * @param {String} repoName name of repository
   * 
   * @returns {Promise} 
   */
  async resetHEAD(repoName) {
    let dir = await this.ensureDir(repoName);
    await this.exec('fetch origin', {cwd: dir});
    return this.exec('reset --hard origin/master', {cwd: dir});
  }

  /**
   * @method clean
   * @description remove all untracked files and directories
   * @param {String} repoName name of repository
   * 
   * @returns {Promise} 
   */
  async clean(repoName) {
    let dir = await this.ensureDir(repoName);
    return this.exec('clean -f -d', {cwd: dir});
  }

  /**
   * @method addAll
   * @description add all changes
   * @param {String} repoName name of repository
   * 
   * @returns {Promise} 
   */
  async addAll(repoName) {
    let dir = await this.ensureDir(repoName);
    return this.exec(`add --all`, {cwd: dir});
  }

  /**
   * @method commit
   * @description commit changes
   * @param {String} repoName name of repository
   * @param {String} message commit message
   * 
   * @returns {Promise} 
   */
  async commit(repoName, message, username='') {
    let dir = await this.ensureDir(repoName);
    if( username ) username = `--author="${username} <>"`;
    return this.exec(`commit ${username} -m "${message}"`, {cwd: dir});
  }

  /**
   * @method status
   * @description repo status
   * @param {String} repoName name of repository
   * 
   * @returns {Promise} 
   */
  async status(repoName) {
    let dir = await this.ensureDir(repoName);
    return this.exec(`status -s`, {cwd: dir});
  }

  /**
   * @method removeRepositoryFromDisk
   * @description remove a repository from disk (not github)
   * @param {String} repoName name of repository
   * 
   * @returns {Promise} 
   */
  async removeRepositoryFromDisk(repoName) {
    var {repoName, org} = utils.getRepoNameAndOrg(repoName);
    let dir = path.join(ROOT, org, repoName);
    if( fs.existsSync(dir) ) {
      await fs.remove(dir);
    }
  }

  async currentChangesCount(repoName) {
    let dir = await this.ensureDir(repoName);
    let {stdout, stderr} = await this.exec(`status -s | wc -l`, {cwd: dir});
    return parseInt(stdout.trim());
  }

  exec(cmd, options = {}) {
    cmd = 'git '+cmd;
    options.shell = '/bin/bash';
    options.maxBuffer = 100000 * 1024;

    return new Promise((resolve, reject) => {
      exec(cmd, options, (error, stdout, stderr) => {
        if( error ) reject({stdout, stderr, error});
        else resolve({stdout, stderr});
      });
    });
  }

}

module.exports = new GitCli();