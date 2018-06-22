const fs = require('fs-extra');
const PackageLayout = require('./base');
const basicLayout = require('./basic');

class LanguagePackageLayout extends PackageLayout {
  async ensureLayout(pkg) {    
    let rDir = basicLayout.getResourcesDir(pkg.name);
    if( fs.existsSync(rDir) ) {
      await fs.move(rDir, this.getResourcesDir(pkg.name));
    }
    await fs.mkdirs(this.getResourcesDir(pkg.name));

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
    let rDir = this.getResourcesDir(pkg.name);
    if( fs.existsSync(rDir) )  {
      await fs.move(rDir, basicLayout.getResourcesDir(pkg.name));
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

  getResourcesDir(pkgName) {
    return basicLayout.getResourcesDir(pkgName);
  }
}

module.exports = LanguagePackageLayout;