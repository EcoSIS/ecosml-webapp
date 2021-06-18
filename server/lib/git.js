const { exec } = require('child_process');
const {URL} = require('url');
const fs = require('fs-extra');
const config = require('./config');
const utils = require('./utils');
const logger = require('./logger');
const path = require('path');
const { stdin } = require('process');
const GITHUB_ACCESS = config.github.access;

const ROOT = config.github.fsRoot;
const SHALLOW_ROOT = path.join(ROOT, '_');
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
   * 
   * @param {String} repoName 
   * 
   * @return {Promise}
   */
  async clone(repoOrg, repoName) {
    await this.removeRepositoryFromDisk(repoOrg, repoName);
    let url = BASE_URL+'/'+repoOrg+'/'+repoName;

    let orgDir = path.join(ROOT, repoOrg);
    if( !fs.existsSync(orgDir) ) {
      await fs.mkdirp(orgDir);
    }

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
  async ensureDir(repoOrg, repoName) {
    let dir = this.getRepoPath(repoOrg, repoName);
    if( !fs.existsSync(dir) ) {
      await this.clone(repoOrg, repoName);
    }
    return dir;
  }

  /**
   * @method getRepoPath
   * @description the full path to a repository on disk
   * 
   * @param {String} repoOrg
   * @param {String} repoName name of repository
   * 
   * @returns {String} full path 
   */
  getRepoPath(repoOrg, repoName) {
    return path.join(ROOT, repoOrg, repoName);
  }

  /**
   * @method pull
   * @description pull a respository
   * 
   * @param {String} repoOrg
   * @param {String} repoName name of repository
   * 
   * @returns {Promise} 
   */
  async pull(repoOrg, repoName) {
    let dir = await this.ensureDir(repoOrg, repoName);
    return this.exec(`pull`, {cwd: dir});
  }

  /**
   * @method push
   * @description push a respository
   * 
   * @param {String} repoOrg
   * @param {String} repoName name of repository
   * 
   * @returns {Promise} 
   */
  async push(repoOrg, repoName) {
    let dir = await this.ensureDir(repoOrg, repoName);
    return this.exec(`push`, {cwd: dir});
  }

  /**
   * @method resetHEAD
   * @description reset a repository to local HEAD
   * 
   * @param {String} repoOrg
   * @param {String} repoName name of repository
   * @param {String} branch main branch
   * 
   * @returns {Promise} 
   */
  async resetHEAD(repoOrg, repoName, branch='master') {
    let dir = await this.ensureDir(repoOrg, repoName);
    await this.exec('fetch origin', {cwd: dir});
    return this.exec('reset --hard origin/'+branch, {cwd: dir});
  }

  /**
   * @method defaultBranchName
   * @description get default branch name.  This is a special command
   * that runs in the shallow root and requires the host
   * 
   * @param {String} repoHost
   * @param {String} repoOrg 
   * @param {String} repoName 
   * @returns {String}
   */
  async defaultBranchName(repoHost, repoOrg, repoName, opts={}) {
    let orgDir = path.join(SHALLOW_ROOT, repoHost.replace(/.*\//, ''), repoOrg);

    if( !fs.existsSync(orgDir) ) {
      await fs.mkdirp(orgDir);
    }
   
    let repoDir = path.join(orgDir, repoName);
    if( opts.clean && fs.existsSync(repoDir) ) {
      await fs.remove(repoDir);
    }

    
    if( fs.existsSync(repoDir) ) {
      await this.exec(`pull`, {cwd: repoDir, });
    } else {
       // set a dumby username/password in url
      let url = repoHost.replace(/\/\//, '//user:password@')+'/'+repoOrg+'/'+repoName; 
      await this.exec(`clone -n --depth 1 ${url}`, {cwd: orgDir});
    }

    let {stdout, stderr} = await this.exec('symbolic-ref refs/remotes/origin/HEAD', {cwd: repoDir});
    return stdout.replace(/.*\//, '').trim();
  }

  /**
   * @method clean
   * @description remove all untracked files and directories
   * 
   * @param {String} repoOrg
   * @param {String} repoName name of repository
   * 
   * @returns {Promise} 
   */
  async clean(repoOrg, repoName) {
    let dir = await this.ensureDir(repoOrg, repoName);
    return this.exec('clean -f -d', {cwd: dir});
  }

  /**
   * @method addAll
   * @description add all changes
   * 
   * @param {String} repoOrg
   * @param {String} repoName name of repository
   * 
   * @returns {Promise} 
   */
  async addAll(repoOrg, repoName) {
    let dir = await this.ensureDir(repoOrg, repoName);
    return this.exec(`add --all`, {cwd: dir});
  }

  /**
   * @method commit
   * @description commit changes
   * 
   * @param {String} repoOrg
   * @param {String} repoName name of repository
   * @param {String} message commit message
   * 
   * @returns {Promise} 
   */
  async commit(repoOrg, repoName, message, username='') {
    let dir = await this.ensureDir(repoOrg, repoName);
    if( username ) username = `--author="${username} <>"`;
    return this.exec(`commit ${username} -m "${message}"`, {cwd: dir});
  }

  /**
   * @method _getPartsFromUrl
   * @description parse repo url returning url object, repo names; repoOrg, repoName
   * as well as path information; repoPath repoOrgPath.  The nocheckout flag is a switch
   * for the shallow (--no-checkout) path checkouts
   * 
   * @param {String} repoUrl 
   * @param {Boolean} nocheckout
   * 
   * @return {String}
   */
  _getPartsFromUrl(repoUrl, nocheckout=false) {
    repoUrl = repoUrl.replace(/\.git$/, '');
    repoUrl = new URL(repoUrl);
    let [repoOrg, repoName] = repoUrl.pathname.replace(/^\//, '').split('/');
    let repoOrgPath = path.join((nocheckout ? config.git.noCheckoutFsRoot : ROOT), repoUrl.host, repoOrg);
    let repoPath = path.join(repoOrgPath, repoName);
    return {url: repoUrl, repoOrg, repoName, repoPath, repoOrgPath};
  }

  /**
   * @method noCheckoutClone
   * @description either clone or re-pull a repo using --no-checkout flag (just pulls .git dir)
   * 
   * @param {String} repoUrl 
   * 
   * @returns {Promise}
   */
  async noCheckoutClone(repoUrl) {
    let {repoPath, repoOrgPath, repoOrg, repoName} = this._getPartsFromUrl(repoUrl, true);
    if( fs.existsSync(repoPath) ) {
      try {
        await this.exec(`pull`, {cwd: repoPath});
      } catch(e) {
        logger.warn('failed to pull repo, cloning', e);
      }
    }

    if( fs.existsSync(repoOrgPath) ) {
      await fs.remove(repoOrgPath);
    }
    await fs.mkdirp(repoOrgPath);
    return this.exec(`clone --filter=blob:none --no-checkout ${repoUrl}`, {cwd: repoOrgPath});
  }

  /**
   * @method noCheckoutTagDates
   * @description return array of tag/date objects for repo that has been pulled via
   * the noCheckoutClone() method.
   * 
   * @param {String} repoUrl 
   * 
   * @returns {Promise} resolves to Array
   */
  async noCheckoutTagDates(repoUrl) {
    let {repoPath} = this._getPartsFromUrl(repoUrl, true);
    let {stdout, stderr} = await this.exec(`tag -l --sort=-creatordate --format='%(creatordate:iso-strict):  %(refname:short)'`, {cwd: repoPath});

    return stdout.split('\n')
      .filter(line => line ? true : false)
      .map(line => line.trim().replace(/( |\t)+/, ' ').split(/: /))

      .map(line => ({
        timestamp : new Date(line[0]),
        tag : line[1]
      }));
  }

  /**
   * @method getRemoteTags
   * @description get the tags for a remote repository
   * 
   * @param {String} repoUrl full http repo url
   * 
   * @return {Promise} resolves to array of string
   */
  async getRemoteTags(repoUrl) {
    if( repoUrl.match(/\.git$/) ) repoUrl += '.git';  
    let {stdout, stderr} = await this.exec(`ls-remote --tags ${repoUrl}`);

    let tags = stdout.split('\n')
      .filter(tag => tag ? true : false)
      .map(tag => tag.split(/\t/)[1])
      .filter(tag => tag ? true : false)
      .map( tag => tag.replace(/.*\//, ''))
      .filter(tag => !tag.match(/\^\{\}$/))
      .map(tag => {
        let semver = tag.match(/(\d+)\.(\d+)\.(\d+)/);
        let noPatch = false;
        if( !semver ) {
          semver = tag.match(/(\d+)\.(\d+)/);
          noPatch = true;
        }
        if( !semver ) {
          return {
            tag, major : -1, minor : -1, patch : -1
          }
        }
        return {
          tag,
          major : parseInt(semver[1]),
          minor : parseInt(semver[2]),
          patch : noPatch ? -1 : parseInt(semver[3])
        }
      });

    tags.sort((a, b) => {
      if( a.major > b.major ) return 1;
      if( a.major < b.major ) return -1;

      if( a.minor > b.minor ) return 1;
      if( a.minor < b.minor ) return -1;

      if( a.patch > b.patch ) return 1;
      if( a.patch < b.patch ) return -1;

      return 0;
    });

    return tags.map(tag => tag.tag);
  }

  /**
   * @method status
   * @description repo status
   * 
   * @param {String} repoOrg
   * @param {String} repoName name of repository
   * 
   * @returns {Promise} 
   */
  async status(repoOrg, repoName) {
    let dir = await this.ensureDir(repoOrg, repoName);
    return this.exec(`status -s`, {cwd: dir});
  }

  /**
   * @method removeRepositoryFromDisk
   * @description remove a repository from disk (not github)
   * 
   * @param {String} repoOrg
   * @param {String} repoName name of repository
   * 
   * @returns {Promise} 
   */
  async removeRepositoryFromDisk(repoOrg, repoName) {
    let dir = path.join(ROOT, repoOrg, repoName);
    if( fs.existsSync(dir) ) {
      await fs.remove(dir);
    }

    dir = path.join(SHALLOW_ROOT, repoOrg, repoName);
    if( fs.existsSync(dir) ) {
      await fs.remove(dir);
    }
  }

  async currentChangesCount(repoOrg, repoName) {
    let dir = await this.ensureDir(repoOrg, repoName);
    let {stdout, stderr} = await this.exec(`status -s | wc -l`, {cwd: dir});
    return parseInt(stdout.trim());
  }

  exec(cmd, options = {}) {
    cmd = 'git '+cmd;
    options.shell = '/bin/bash';
    options.maxBuffer = 100000 * 1024;

    logger.info(cmd);

    return new Promise((resolve, reject) => {
      exec(cmd, options, (error, stdout, stderr) => {
        if( error ) reject({stdout, stderr, error});
        else resolve({stdout, stderr});
      });
    });
  }

}

module.exports = new GitCli();