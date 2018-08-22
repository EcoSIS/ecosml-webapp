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

    let rInit = path.join(this.getResourcesDir(pkg.name), '__init__.py');
    if( !fs.existsSync(rInit) ) await fs.writeFile(rInit, '');
    
    let mInit = path.join(this.getMainDir(pkg.name), '__init__.py');
    if( !fs.existsSync(mInit) ) await fs.writeFile(mInit, '');

    let version = '0.0.1';
    if( pkg.releases && pkg.releases.length ) {
      version = pkg.releases[pkg.releases.length-1].name;
    }
    
    // add setup.py
    let setuppy = templates('setup.py', {
      name : this.getPackageDirName(pkg.name),
      version : version,
      author : pkg.owner,
      overview : pkg.overview,
      keywords : pkg.keywords ? pkg.keywords.join(' ') : '',
      url : config.server.url+'/package/'+pkg.id
    });
    let setupPath = path.join(git.getRepoPath(pkg.name), 'setup.py');
    await fs.writeFile(setupPath, setuppy);

    // add requirements
    let reqFilePath = path.join(this.getRootDir(pkg.name), 'requirements.txt');
    if( !fs.existsSync(reqFilePath) ) {
      let reqFile = templates('requirements.txt');
      await fs.writeFile(reqFilePath, reqFile);
    }

    // add model utils
    let utilFilePath = path.join(this.getMainDir(pkg.name), 'ecosml_model_utils.py');
    if( !fs.existsSync(utilFilePath) ) {
      let utilFile = templates('ecosml_model_utils.py');
      await fs.writeFile(utilFilePath, utilFile);
    }

    // setup examples
    let examplesDir = this.getExamplesDir(pkg.name);
    if( fs.existsSync(examplesDir) ) {
      let files = await fs.readdir(examplesDir);
      for( var i = 0; i < files.length; i++ ) {
        if( !fs.statSync(path.join(examplesDir, files[i])).isDirectory() ) {
          continue;
        }
        await this.ensureExampleLayout(pkg.name, files[i]);
      }
    }
  }

  async undoLayout(pkg) {
    await super.undoLayout(pkg);

    // remove __init__.py files
    let rInit = path.join(super.getResourcesDir(pkg.name), '__init__.py');
    if( fs.existsSync(rInit) ) await fs.unlink(rInit);
    
    let mInit = path.join(super.getMainDir(pkg.name), '__init__.py');
    if( fs.existsSync(mInit) ) await fs.unlink(mInit);

    let setupPath = path.join(git.getRepoPath(pkg.name), 'setup.py');
    if( fs.existsSync(setupPath) ) {
      await fs.unlink(setupPath);
    }

    let pkgPath = this.getPackageRootDir(pkg.name);
    if( fs.existsSync(pkgPath) ) {
      await fs.remove(pkgPath);
    }

    // cleanup examples
    let examplesDir = this.getExamplesDir(pkg.name);
    if( fs.existsSync(examplesDir) ) {
      let files = await fs.readdir(examplesDir);

      for( var i = 0; i < files.length; i++ ) {
        if( !fs.statSync(path.join(examplesDir, files[i])).isDirectory() ) {
          continue;
        }
        await this.undoExampleLayout(pkg.name, files[i]);
      }
    }
  }

  async ensureExampleLayout(pkgName, exampleName) {
    let rootDir = this.getExamplesDir(pkgName);
    rootDir = path.join(rootDir, exampleName);
    
    if( !fs.existsSync(rootDir) ) await fs.mkdirs(rootDir);
    
    for( var key in this.EXAMPLE_DIRS ) {
      await fs.mkdirs(path.join(rootDir, this.EXAMPLE_DIRS[key]));
    }

    // create the transform __init__.py file so it can be treated as a module
    let tInit = path.join(rootDir, this.EXAMPLE_DIRS.TRANSFORM, '__init__.py');
    await fs.writeFile(tInit, '');

    // add the tranform helper library
    let utilspy = templates('ecosml_transform_utils.py');
    let utilsPath = path.join(rootDir, this.EXAMPLE_DIRS.TRANSFORM, 'ecosml_transform_utils.py');
    await fs.writeFile(utilsPath, utilspy);

    // add the example test py file
    let testpy = templates('test.py', {
      name : this.getPackageDirName(pkgName)
    });
    let testPath = path.join(rootDir, 'test.py');
    await fs.writeFile(testPath, testpy);
  }

  async undoExampleLayout(pkgName, exampleName) {
    let rootDir = this.getExamplesDir(pkgName);
    rootDir = path.join(rootDir, exampleName);
    
    // remove the transform __init__.py file
    let tInit = path.join(rootDir, this.EXAMPLE_DIRS.TRANSFORM, '__init__.py');
    if( fs.existsSync(tInit) ) await fs.unlink(tInit);

    // remove the tranform helper library
    let utilsPath = path.join(rootDir, this.EXAMPLE_DIRS.TRANSFORM, 'ecosml_transform_utils.py');
    if( fs.existsSync(utilsPath) ) await fs.unlink(utilsPath);
  }

  getPackageDirName(pkgName) {
    return pkgName.replace(/-/g, '_');
  }

  getPackageRootDir(pkgName) {
    let rootDir = git.getRepoPath(pkgName);
    return path.join(rootDir, this.getPackageDirName(pkgName));
  }

  getMainDir(pkgName) {
    return path.join(this.getPackageRootDir(pkgName), this.MAIN_DIR_NAME);
  }

  getExamplesDir(pkgName) {
    return path.join(this.getPackageRootDir(pkgName), this.EXAMPLES_DIR_NAME);
  }

  getResourcesDir(pkgName) {
    return path.join(this.getPackageRootDir(pkgName), this.RESOURCES_DIR_NAME);
  }
}

module.exports = new PythonPackageLayout();