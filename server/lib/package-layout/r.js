const git = require('../git');
const path = require('path');
const LanguageLayout = require('./language');

class RPackageLayout extends LanguageLayout {
  getExamplesDir(pkgName) {
    let rootDir = git.getRepoPath(pkg.name);
    return path.join(rootDir, 'R', this.MAIN_DIR_NAME);
  }

  getMainDir(pkgName) {
    let rootDir = git.getRepoPath(pkg.name);
    return path.join(rootDir, 'R', this.MAIN_DIR_NAME);
  }

  getCoeffientsDir(pkgName) {
    let rootDir = git.getRepoPath(pkg.name);
    return path.join(rootDir, 'R', this.COEFFIENTS_DIR_NAME);
  }
}

module.exports = new RPackageLayout();