const { exec } = require('child_process');
const fs = require('fs-extra');
const config = require('./config');
const path = require('path');
const GITHUB_ACCESS = config.github.access;

const ROOT = config.github.fsRoot;
const ORG = config.github.org;
const BASE_URL = `https://${GITHUB_ACCESS.username}:${GITHUB_ACCESS.token}@github.com/${ORG}/`;

if( !fs.existsSync(ROOT) ) {
  fs.mkdirpSync(ROOT);
}

class GitCli {

  /**
   * @method initConfig
   * @description make sure the git config username/email is set correctly
   */
  async initConfig() {
    await this.exec(`config --global user.email "${config.git.email}"`);
    await this.exec(`config --global user.name "${config.git.name}"`);
  }

  async clone(repoName) {
    let url = BASE_URL+repoName;
    return this.exec(`clone ${url}`, {cwd: ROOT});
  }

  async ensureDir(repoName) {
    let dir = path.join(ROOT, repoName);
    if( !fs.existsSync(dir) ) {
      await this.clone(repoName);
    }
    return dir;
  }

  getRepoPath(repoName) {
    return path.join(ROOT, repoName);
  }

  async pull(repoName) {
    let dir = await this.ensureDir(repoName);
    return this.exec(`pull`, {cwd: dir});
  }

  async push(repoName) {
    let dir = await this.ensureDir(repoName);
    return this.exec(`push`, {cwd: dir});
  }

  async resetHEAD(repoName) {
    let dir = await this.ensureDir(repoName);
    return this.exec(`reset HEAD --hard`, {cwd: dir});
  }

  async addAll(repoName) {
    let dir = await this.ensureDir(repoName);
    return this.exec(`add --all`, {cwd: dir});
  }

  async commit(repoName, message) {
    let dir = await this.ensureDir(repoName);
    return this.exec(`commit -m "${message}"`, {cwd: dir});
  }

  async removeRepository(repoName) {
    let dir = path.join(ROOT, repoName);
    await fs.remove(dir);
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
        if( error ) reject(error);
        else resolve({stdout, stderr});
      });
    });
  }

}

module.exports = new GitCli();