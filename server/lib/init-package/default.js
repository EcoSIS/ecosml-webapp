const fs = require('fs-extra');
const path = require('path');
const config = require('../config');
const template = require('../../templates');

const TEMPLATE_ROOT = path.resolve(__dirname, '..', '..', 'templates', 'default-package');

module.exports = async function(pkg) {
  let rootDir = path.join(config.github.fsRoot, pkg.name);
  await fs.mkdirp(rootDir);

  // copy template package
  let files = await fs.readdir(TEMPLATE_ROOT);
  for( let file of files ) {
    if( file.charAt(0) === '.' ) continue;

    await fs.copy(
      path.join(TEMPLATE_ROOT, file), 
      path.join(rootDir, file)
    )
  }
}