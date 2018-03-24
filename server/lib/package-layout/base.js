const path = require('path');
const git = require('../git');

class PackageLayout {

  constructor() {
    this.COEFFIENTS_DIR_NAME = 'coefficients';
    this.EXAMPLES_DIR_NAME = 'examples';
    this.PAPERS_DIR_NAME = 'papers';
    this.MAIN_DIR_NAME = 'main';

    this.EXAMPLE_DIRS = {
      INPUT : 'input',
      OUTPUT : 'output',
      TRANSFORM : 'transform'
    }
  }

  genericToAbsLangPath(gPath, pkg) {
    gPath = gPath.replace(/^\//, '').split('/');
    if( !gPath.length ) return this.getRootDir(pkgName);

    if( gPath[0] === this.COEFFIENTS_DIR_NAME ) {
      gPath.splice(0, 1);
      return path.join(this.getCoeffientsDir(), gPath.join('/'));
    } else if( gPath[0] === this.MAIN_DIR_NAME ) {
      gPath.splice(0, 1);
      return path.join(this.getMainDir(), gPath.join('/'));
    }

    return path.join(this.getRootDir(pkgName), gPath.join('/'));
  }

  langPathToGeneric(lPath, pkg) {
    let pkgRoot = this.getPackageDirName(pkg.name);
    if( !pkgRoot ) return lPath;
    return lPath.replace(new RegExp('^\/'+pkgRoot), '')
  }

  getRootDir(pkgName) {
    return git.getRepoPath(pkgName)
  }

  rename() {}
  ensureLayout() {}
  ensureExampleLayout() {}
  undoLayout() {}
  getCoeffientsDir() {}
  getExamplesDir() {}
  getMainDir() {}
  getPapersDir() {}
  getPackageRootDir() {}
  getPackageDirName() {}

}

module.exports = PackageLayout;