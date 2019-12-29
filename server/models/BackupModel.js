const fs = require('fs-extra');
const path = require('path');
const config = require('../lib/config');
const {exec} = require('child_process');
const aws = require('../lib/aws');

class BackupModel {

  constructor() {
    setInterval(async () => {
      if( new Date().getHours() !== 3 ) return;
      try {
        await this.run();
      } catch(e) {
        
      }
      
    }, 1000 * 60 * 60);
  }

  async run() {
    await fs.emptyDir(config.backups.tmpDir);

    let filename = this._getBackupFilename(new Date());
    let filepath = path.join(config.backups.tmpDir, filename);
    

    await this._mongodump();
    await this._zip(filepath, 'mongodump', config.backups.tmpDir);

    let parts = config.doi.snapshotDir.replace(/^\//, '').split('/');
    await this._zip(filepath, parts[1], parts[0]);

    await this._upload(filepath, filename);
    await this.clean(filename);
  }

  _getBackupFilename(date) {
    return 'ecosml_backup_'+new Date().toISOString().replace(/T.*/, '')+'zip';
  }

  clean(filename) {
    let date = new Date();
    let keep = [];
    if( filename ) keep.push(filename);

    // last 7 days
    for( let i = 0; i < 7; i++ ) {
      date = new Date(date.getFullYear(), date.getMonth(), date.getDate()-i, 12, 0, 0, 0, 0);
      keep.push(this._getBackupFilename(date));
    }

    // last 12 months
    let date = new Date();
    for( let i = 0; i < 7; i++ ) {
      date = new Date(date.getFullYear(), date.getMonth()-i, 1, 12, 0, 0, 0, 0);
      keep.push(this._getBackupFilename(date));
    }

    let currentBackups = await aws.listFiles(config.backups.bucket);
    for( let file of currentBackups ) {
      if( keep.indexOf(file) === -1 ) {
        await aws.deleteFile(file, config.backups.bucket);
      }
    }

    if( config.backups.ecosisBucket ) {
      currentBackups = await aws.listFiles(config.backups.ecosisBucket);
      for( let file of currentBackups ) {
        file = file.replace(/ecosml/, 'ecosis');
        if( keep.indexOf(file) === -1 ) {
          console.log('Removing ecosis backup: '+file);
          // await aws.deleteFile(file, config.backups.bucket);
        }
      }
    }
  }

  _upload(filepath, filename) {
    return aws.uploadFile(filepath, config.backups.bucket, filename);
  }

  _mongodump() {
    let outputFile = path.join(config.backups.tmpDir, 'mongodump');
    let cmd = `mongodump --uri ${config.mongodb.url} --out ${outputFile}`;
    return this.exec(cmd);
  }

  _zip(zipFile, file, cwd) {
    return this.exec(`zip -r ${zipFile} ${file}`, {cwd});
  }

  exec(cmd, options={}) {
    return new Promise((resolve, reject) => {
      exec(cmd, options, (error, stdout, stderr) => {
        if( error ) reject(error);
        else resolve({stdout, stderr});
      });
    });
  }
}

module.exports = new BackupModel();