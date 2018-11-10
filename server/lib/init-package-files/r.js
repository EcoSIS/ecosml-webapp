const fs = require('fs-extra');
const path = require('path');
const config = require('../../lib/config');
const template = require('../../templates');

const TEMPLATE_ROOT = path.join(__dirname, '..', '..', 'templates', 'r-package');

module.exports = async function(pkg) {
  let rName = pkg.name.replace(/[^a-zA-Z0-9]/g, '');
  let rootDir = path.join(config.github.fsRoot, pkg.name);
  
  // copy template package
  let files = await fs.readdir(TEMPLATE_ROOT);
  for( let file of files ) {
    if( file.charAt(0) === '.' ) continue;

    await fs.copy(
      path.join(TEMPLATE_ROOT, file), 
      path.join(rootDir, file)
    )
  }

  // fill in DESCRIPTION file
  let setup = path.join(rootDir, 'DESCRIPTION');
  await template(setup, {
    packageName : rName,
    title : rName,
    author : pkg.owner,
    version :  pkg.version || '0.0.1',
    description : pkg.overview || ''
  });
}