const git = require('../git');
const path = require('path');
const fs = require('fs-extra');
const config = require('../config');
const LanguageLayout = require('./language');
const templates = require('../../templates');

class PythonPackageLayout extends LanguageLayout {

  async rename(oldName, newName) {
    let oldRoot = path.join(git.getRepoPath(newName), oldName);
    let newRoot = path.join(git.getRepoPath(newName), newName);
    if( fs.existsSync(oldRoot) ) {
      await fs.move(oldRoot, newRoot);
    }
  }

  async ensureLayout(pkg) {
    await super.ensureLayout(pkg);
    
    let version = '0.0.1';
    if( pkg.releases && pkg.releases.length ) {
      version = pkg.releases[pkg.releases.length-1].name;
    }
    
    let setuppy = templates('setup.py', {
      name : pkg.name,
      version : version,
      author : pkg.owner,
      overview : pkg.overview,
      keywords : pkg.keywords ? pkg.keywords.join(' ') : '',
      url : config.server.url+'/package/'+pkg.id
    });
    let setupPath = path.join(git.getRepoPath(pkg.name), 'setup.py');
    await fs.writeFile(setupPath, setuppy);
  }

  async undoLayout(pkg) {
    await super.undoLayout(pkg);

    let setupPath = path.join(git.getRepoPath(pkg.name), 'setup.py');
    if( fs.existSync(setupPath) ) {
      await fs.unlink(setupPath);
    }
  }

  getExamplesDir(pkgName) {
    let rootDir = git.getRepoPath(pkg.name);
    return path.join(rootDir, pkgName, this.MAIN_DIR_NAME);
  }

  getMainDir(pkgName) {
    let rootDir = git.getRepoPath(pkg.name);
    return path.join(rootDir, pkgName, this.MAIN_DIR_NAME);
  }

  getCoeffientsDir(pkgName) {
    let rootDir = git.getRepoPath(pkg.name);
    return path.join(rootDir, pkgName, this.COEFFIENTS_DIR_NAME);
  }
}

module.exports = new PythonPackageLayout();