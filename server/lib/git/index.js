const { exec } = require('child_process');
const config = require('../config');

const ORG = config.github.org;
const BASE_URL = `https://github.com/${ORG}/`

class GitCli {

  async clone(repoName) {
    let url = BASE_URL+repoName;
    let {stdout, stderr} = await this.exec(`clone ${url}`);
  }

  async pull(repoName) {
    let {stdout, stderr} = await this.exec(`pull`);
  }

  async resetHEAD(repoName) {
    let {stdout, stderr} = await this.exec(`reset HEAD --hard`);
  }

  async commit(repoName, message) {
    let {stdout, stderr} = await this.exec(`commit -m "${message}"`);
  }

  exec(cmd, options = {}) {
    cmd = 'git '+cmd;
    options.shell = '/bin/bash';
    options.maxBuffer = 100000 * 1024;

    return new Promise((resolve, reject) => {
      exec(cmd, options, (error, stdout, stderr) => {
        if( error ) reject(error);
        else {stdout, stderr};
      });
    });
  }

}