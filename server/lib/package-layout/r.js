const git = require('../git');
const path = require('path');
const LanguageLayout = require('./language');
const fs = require('fs-extra');

class RPackageLayout extends LanguageLayout {

  async undoLayout(pkg) {
    await super.undoLayout(pkg);

    let pkgPath = path.join(git.getRepoPath(pkg.name), 'R');
    if( fs.existsSync(pkgPath) ) {
      await fs.remove(pkgPath);
    }
  }

  getPackageRootDir(pkgName) {
    let rootDir = git.getRepoPath(pkgName);
    return path.join(rootDir, 'R');
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

module.exports = new RPackageLayout();