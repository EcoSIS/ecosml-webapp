const exec = require('child_process').exec;
const fs = require('fs-extra');
const tmp = require('tmp');
const mongo = require('../mongo')

const script = 'markdown.rb';

module.exports = function(markdown, pkg='') {
  return new Promise(async (resolve, reject) => {

    pkg = await mongo.getPackage(pkg);

    tmp.file(async (err, tmpFilePath, fd, cleanup) => {
      if( err ) return reject(err);

      markdown = markdown.replace(/[^\x00-\x7F]/g, '');
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

          // replace local image references with GitHub url
          if( pkg.host === 'github' ) {
            let imgSrc = `https://github.com/${pkg.repoOrg}/${pkg.name}/raw/master`;
            stdout = (stdout || '').replace(/<img\s+src="\./g, `<img src="${imgSrc}`);
          }

          resolve(stdout);
        }

        cleanup();
      });
    });
  });
}