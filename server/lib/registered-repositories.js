const git = require('./git');
const config = require('./config');
const fs = require('fs-extra');
const path = require('path');
const clone = require('clone');

// TODO: where do we want to write the backups?
class RegisteredRepositories {

  constructor() {
    this.config = config.github.registeredRepositories;
    this.repoFile = path.join(git.rootDir, this.config.file);
  }

  async load() {
    await git.clone(this.config.repoName);
    
    if( fs.existsSync(this.repoFile) ) {
      this.data = require(this.repoFile);
    } else {
      this.data = [];
      await fs.writeFile(this.repoFile, '[]');
    }

    return this.data;
  }

  async update(pkg) {
    await this.load();

    pkg = clone(pkg);
    for( let attr in this.config.removeAttributes ) {
      if( pkg[attr] ) delete pkg[attr];
    }

    let found = false;
    for( let i = 0; i < this.data.length; i++ ) {
      if( this.data[i].id === pkg.id ) {
        this.data[i] = pkg;
        found = true;
        break;
      }
    }
    if( !found ) this.data.push(pkg);

    await fs.writeFile(this.repoFile, this.repoFile);
    
    let changes = await git.currentChangesCount(this.config.repoName);
    if( changes === 0 ) return;

    await git.addAll(packageName);
    await git.commit(packageName, (found ? 'Adding' : 'Updating')+' '+pkg.name);
    await git.push(packageName);
  }

}