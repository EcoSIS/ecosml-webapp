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
    
    // add default __init__.py files
    let pInit = path.join(this.getPackageRootDir(pkg.name), '__init__.py');
    if( !fs.existsSync(pInit) ) await fs.writeFile(pInit, '');

    let exInit = path.join(this.getExamplesDir(pkg.name), '__init__.py');
    if( !fs.existsSync(exInit) ) await fs.writeFile(exInit, '');

    let coInit = path.join(this.getCoeffientsDir(pkg.name), '__init__.py');
    if( !fs.existsSync(coInit) ) await fs.writeFile(coInit, '');
    
    let mInit = path.join(this.getMainDir(pkg.name), '__init__.py');
    if( !fs.existsSync(mInit) ) await fs.writeFile(mInit, '');

    let version = '0.0.1';
    if( pkg.releases && pkg.releases.length ) {
      version = pkg.releases[pkg.releases.length-1].name;
    }
    
    // add setup.py
    let setuppy = templates('setup.py', {
      name : this.getPyName(pkg.name),
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

    // remove __init__.py files
    let exInit = path.join(super.getExamplesDir(pkg.name), '__init__.py');
    if( fs.existsSync(exInit) ) await fs.unlink(exInit);

    let coInit = path.join(super.getCoeffientsDir(pkg.name), '__init__.py');
    if( fs.existsSync(coInit) ) await fs.unlink(coInit);
    
    let mInit = path.join(super.getMainDir(pkg.name), '__init__.py');
    if( fs.existsSync(mInit) ) await fs.unlink(mInit);

    let setupPath = path.join(git.getRepoPath(pkg.name), 'setup.py');
    if( fs.existsSync(setupPath) ) {
      await fs.unlink(setupPath);
    }

    let pkgPath = path.join(git.getRepoPath(pkg.name), pkg.name);
    if( fs.existsSync(pkgPath) ) {
      await fs.remove(pkgPath);
    }
  }

  getPyName(pkgName) {
    return pkgName.replace(/-/g, '_');
  }

  getPackageRootDir(pkgName) {
    let rootDir = git.getRepoPath(pkgName);
    return path.join(rootDir, this.getPyName(pkgName));
  }

  getExamplesDir(pkgName) {
    return path.join(this.getPackageRootDir(pkgName), this.EXAMPLES_DIR_NAME);
  }

  getMainDir(pkgName) {
    return path.join(this.getPackageRootDir(pkgName), this.MAIN_DIR_NAME);
  }

  getCoeffientsDir(pkgName) {
    return path.join(this.getPackageRootDir(pkgName), this.COEFFIENTS_DIR_NAME);
  }
}

module.exports = new PythonPackageLayout();