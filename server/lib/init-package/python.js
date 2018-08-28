const fs = require('fs-extra');
const path = require('path');
const config = require('../config');
const template = require('../../templates');

const TEMPLATE_ROOT = path.join(__dirname, '..', '..', 'templates', 'python-package');

module.exports = async function(pkg) {
  let pythonName = pkg.name.replace(/-/g, '_');
  let rootDir = path.join(config.github.fsRoot, pkg.name);
  await fs.mkdirp(rootDir);

  // copy template package
  let files = await fs.readdir(TEMPLATE_ROOT);
  for( let file of files ) {
    if( file.charAt(0) === '.' ) continue;

    let toFile = file;
    if( file === 'package_name' ) toFile = pythonName;

    await fs.copy(
      path.join(TEMPLATE_ROOT, file), 
      path.join(rootDir, toFile)
    )
  }

  // fill in setup.py
  let setup = path.join(rootDir, 'setup.py');
  await template(setup, {
    name : pythonName,
    author : pkg.owner,
    overview : pkg.overview || '',
    keywords : pkg.keywords ? pkg.keywords.join(' ') : '',
    url : config.server.url+'/package/'+pkg.id
  });

  // fill in sample test
  // setup = path.join(rootDir, pythonName, 'examples', 'sample', 'test.py');
  // await template(setup, {name : pythonName});
}