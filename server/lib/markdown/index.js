const exec = require('child_process').exec;
const fs = require('fs-extra');
const tmp = require('tmp');
const config = require('../config');

const script = 'markdown.rb';
const ORG = config.github.org;

module.exports = function(markdown, repoName='') {
  return new Promise((resolve, reject) => {
    tmp.file(async (err, tmpFilePath, fd, cleanup) => {
      if( err ) return reject(err);

      await fs.writeFile(tmpFilePath, markdown);

      let options = {
        cwd : __dirname,
        shell : '/bin/bash'
      }

      exec(`ruby ${script} ${tmpFilePath}`, options, (error, stdout, stderr) => {
        if( error ) {
          reject(error);
        } else if( stderr ) {
          reject(stderr);
        } else {
          let org = ORG;
          if( repoName.indexOf('/') > -1 ) {
            let parts = repoName.split('/');
            org = parts[0];
            repoName = parts[1];
          }

          // replace local image references with GitHub url
          let imgSrc = `https://github.com/${org}/${repoName}/raw/master`;
          stdout = (stdout || '').replace(/<img\s+src="\./g, `<img src="${imgSrc}`);

          resolve(stdout);
        }

        cleanup();
      });
    });
  });
}