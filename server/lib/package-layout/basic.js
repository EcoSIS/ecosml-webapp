const git = require('../git');
const fs = require('fs-extra');
const path = require('path');
const PackageLayout = require('./base');

class BasicPackageLayout extends PackageLayout {

  async ensureLayout(pkg) {
    let exampleDir = this.getExamplesDir(pkg.name);
    if( !fs.existsSync(exampleDir) ) {
      await fs.mkdirs(exampleDir);
    }

    let mainDir = this.getMainDir(pkg.name);
    if( !fs.existsSync(mainDir) ) {
      await fs.mkdirs(mainDir);
    }

    let coeffientsDir = this.getCoeffientsDir(pkg.name);
    if( !fs.existsSync(coeffientsDir) ) {
      await fs.mkdirs(coeffientsDir);
    }
  }

  async ensurePapersDir(pkgName) {
    let paperDir = this.getPapersDir(pkgName);
    if( !fs.existsSync(paperDir) ) {
      await fs.mkdirs(paperDir);
    }
  }

  getExamplesDir(pkgName) {
    let rootDir = git.getRepoPath(pkgName);
    return path.join(rootDir, this.EXAMPLES_DIR_NAME);
  }

  getMainDir(pkgName) {
    let rootDir = git.getRepoPath(pkgName);
    return path.join(rootDir, this.MAIN_DIR_NAME);
  }

  getCoeffientsDir(pkgName) {
    let rootDir = git.getRepoPath(pkgName);
    return path.join(rootDir, this.COEFFIENTS_DIR_NAME);
  }

  getPapersDir(pkgName) {
    let rootDir = git.getRepoPath(pkgName);
    return path.join(rootDir, this.PAPERS_DIR_NAME);
  }

}

module.exports = new BasicPackageLayout();