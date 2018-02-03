const exec = require('child_process').exec;
const path = require('path');
const fs = require('fs-extra');
const tmp = require('tmp');

const script = 'markdown.rb';

module.exports = function(markdown) {
  return new Promise((resolve, reject) => {
    tmp.file(async (err, tmpFilePath, fd, cleanup) => {
      if( err ) return reject(err);

      await fs.writeFile(tmpFilePath, markdown);

      let options = {
        cwd : __dirname,
        shell : '/bin/bash'
      }

      exec(`ruby ${script} ${tmpFilePath}`, options, (error, stdout, stderr) => {
        if( error ) reject(error);
        else if( stderr ) reject(stderr);
        else resolve(stdout);

        cleanup();
      });
    });
  });
}