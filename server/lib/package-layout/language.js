const fs = require('fs-extra');
const PackageLayout = require('./base');
const basicLayout = require('./basic');

class LanguagePackageLayout extends PackageLayout {
  async ensureLayout(pkg) {    
    let coeffDir = basicLayout.getCoeffientsDir(pkg.name);
    if( fs.existsSync(coeffDir) ) {
      await fs.move(coeffDir, this.getCoeffientsDir(pkg.name));
    }
    await fs.mkdirs(this.getCoeffientsDir(pkg.name));

    let exampleDir = basicLayout.getExamplesDir(pkg.name);
    if( fs.existsSync(exampleDir) ) {
      await fs.move(exampleDir, this.getExamplesDir(pkg.name));
    }
    await fs.mkdirs(this.getExamplesDir(pkg.name));

    let mainDir = basicLayout.getMainDir(pkg.name);
    if( fs.existsSync(mainDir) ) {
      await fs.move(mainDir, this.getMainDir(pkg.name));
    }
    await fs.mkdirs(this.getMainDir(pkg.name));
    
    await basicLayout.ensurePapersDir(pkg.name);
  }

  async undoLayout(pkg) {
    let coeffDir = this.getCoeffientsDir(pkg.name);
    if( fs.existsSync(coeffDir) )  {
      await fs.move(coeffDir, basicLayout.getCoeffientsDir(pkg.name));
    } 

    let exampleDir = this.getExamplesDir(pkg.name);
    if( fs.existsSync(exampleDir) ) {
      await fs.move(exampleDir, basicLayout.getExamplesDir(pkg.name));
    }

    let mainDir = this.getMainDir(pkg.name);
    if( fs.existsSync(mainDir) ) {
      await fs.move(mainDir, basicLayout.getMainDir(pkg.name));
    }

    await basicLayout.ensureLayout(pkg);
  }

  getExamplesDir(pkgName) {
    return basicLayout.getExamplesDir(pkgName);
  }

  getPapersDir(pkgName) {
    return basicLayout.getPapersDir(pkgName);
  }

  getMainDir(pkgName) {
    return basicLayout.getMainDir(pkgName);
  }

  getCoeffientsDir(pkgName) {
    return basicLayout.getCoeffientsDir(pkgName);
  }
}

module.exports = LanguagePackageLayout;