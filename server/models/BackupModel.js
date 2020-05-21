const fs = require('fs-extra');
const path = require('path');
const config = require('../lib/config');
const logger = require('../lib/logger');
const {exec} = require('child_process');
const mongo = require('../lib/mongo');
const aws = require('../lib/aws');
const ecosisSync = require('../lib/sync/ecosis');

class BackupModel {

  constructor() {
    fs.mkdirpSync(config.backups.tmpDir);
    fs.mkdirpSync(config.backups.tmpRestoreDir);

    setInterval(async () => {
      if( new Date().getHours() !== 3 ) return;
      try {
        await this.run();
      } catch(e) {
        logger.error('Failed to run backup', e);
      }
      
    }, 1000 * 60 * 60);
  }

  /**
   * @method run
   * @description create backup.  Includes mongodb snapshot
   */
  async run() {
    logger.info('Creating backup...');
    await fs.emptyDir(config.backups.tmpDir);
    await fs.mkdirp(config.backups.tmpDir);

    let filename = this._getBackupFilename(new Date());
    let filepath = path.join(config.backups.tmpDir, filename);
    logger.info('Using backup filename: '+filename);


    logger.info('Running mongodump for: '+filename);
    await this._mongodump();
    logger.info('Adding mongodump to: '+filename);
    await this._zip(filepath, 'mongodump', config.backups.tmpDir);

    if( fs.existsSync(config.doi.snapshotDir) ) {
      let parts = config.doi.snapshotDir.replace(/^\//, '').split('/');
      logger.info('Adding DOI snapshots to: '+filename);
      await this._zip(filepath, parts[1],  '/'+parts[0]);
    }

    logger.info('Uploading backup to S3: '+config.backups.bucket+'/'+filename);
    await this._upload(filepath, filename);
    await this.clean(filename);

    logger.info('Cleaning up tmp backup files for: '+filename);
    await fs.remove(path.join(config.backups.tmpDir, 'mongodump'));
    await fs.remove(path.join(config.backups.tmpDir, filename));

    logger.info('Backup complete for: '+filename);
  }

  /**
   * @method restore
   * @description restore system from a backup
   * 
   * @param {Date} from Optional. Defaults to latest
   */
  async restore(from) {
    let filename;
    if( !from ) {
      let currentBackups = await aws.listFiles(config.backups.bucket);
      currentBackups = currentBackups.map(file => {
        let [date, year, month, day] = file.match(/(\d{4})-(\d{2})-(\d{2})/)
        return new Date(parseInt(year), parseInt(month)-1, parseInt(day));
      });
      currentBackups.sort((a,b) => (a.getTime() > b.getTime()) ? -1 : 1);
      if( currentBackups.length === 0 ) {
        throw new Error('No backups found and no date provided');
      }
      filename = this._getBackupFilename(currentBackups[0]);
    } else {
      filename = this._getBackupFilename(from);
    }

    logger.info('Restoring system from backup: '+config.backups.bucket+'/'+filename);
    await fs.emptyDir(config.backups.tmpRestoreDir);
    await fs.mkdirp(config.backups.tmpRestoreDir);

    logger.info('Downloading backup zipfile: '+config.backups.bucket+'/'+filename);
    let localfile = path.join(config.backups.tmpRestoreDir, filename);
    await aws.downloadFile(localfile, config.backups.bucket, filename);

    logger.info('Unziping backup zipfile: '+localfile);
    await this._unzip(localfile, config.backups.tmpRestoreDir);

    if( fs.existsSync(config.doi.snapshotDir) ) {
      await fs.remove(config.doi.snapshotDir);
    }

    if( fs.existsSync(path.join(config.backups.tmpRestoreDir, 'snapshots')) ) {
      logger.info('Moving DOI snapshots: '+path.join(config.backups.tmpRestoreDir, 'snapshots'));
      await fs.move(path.join(config.backups.tmpRestoreDir, 'snapshots'), config.doi.snapshotDir);
    } else {
      console.warn('No snapshots found in backup: '+path.join(config.backups.tmpRestoreDir, 'snapshots'));
    }

    logger.info('Running mongo restore on: '+path.join(config.backups.tmpRestoreDir, 'mongodump'));
    let {stdout, stderr} = await this._mongorestore(path.join(config.backups.tmpRestoreDir, 'mongodump'));
    if( stderr ) logger.error(stderr);
    logger.info(stdout);

    await ecosisSync.syncOrgs();
    await ecosisSync.syncGithubData();

    // cleanup
    await fs.emptyDir(config.backups.tmpRestoreDir);

    logger.info('Backup complete for '+filename);
  }

  /**
   * @method _getBackupFilename
   * @description get the backup name for a file
   * 
   * @param {Date} date Optional.  Detaults to now 
   */
  _getBackupFilename(date) {
    date = date || new Date();
    return 'ecosml_backup_'+date.toISOString().replace(/T.*/, '')+'.zip';
  }

  async clean(filename) {
    logger.info('Backup running cleanup: ', (filename || 'all'));
    let date = new Date();
    let keep = [];
    if( filename ) keep.push(filename);

    // last 7 days
    keep.push(this._getBackupFilename(date));
    for( let i = 0; i < 7; i++ ) {
      date = new Date(date.getFullYear(), date.getMonth(), date.getDate()-1, 12, 0, 0, 0, 0);
      keep.push(this._getBackupFilename(date));
    }

    // last 12 months
    date = new Date();
    for( let i = 0; i < 12; i++ ) {
      date = new Date(date.getFullYear(), date.getMonth(), 1, 12, 0, 0, 0, 0);
      keep.push(this._getBackupFilename(date));
      date = new Date(date.getFullYear(), date.getMonth()-1, 1, 12, 0, 0, 0, 0);
    }

    let currentBackups = await aws.listFiles(config.backups.bucket);
    logger.info('Current '+config.backups.bucket+' backups: ', currentBackups);
    for( let file of currentBackups ) {
      if( keep.indexOf(file) === -1 ) {
        logger.info('Backup cleanup removing: ', file, 'from', config.backups.bucket);
        await aws.deleteFile(file, config.backups.bucket);
      }
    }

    // Auto cleanup EcoSIS backups as well
    if( config.backups.ecosisBucket && config.server.serverEnv === 'prod' ) {
      logger.info('Running backup cleaning of EcoSIS')
      currentBackups = await aws.listFiles(config.backups.ecosisBucket);
      logger.info('Current '+config.backups.ecosisBucket+' backups: ', currentBackups);
      for( let file of currentBackups ) {
        let check = file.replace(/ecosis/, 'ecosml');
        if( keep.indexOf(check) === -1 ) {
          logger.info('Removing ecosis backup: '+file);
          await aws.deleteFile(file, config.backups.ecosisBucket);
        }
      }
    }

    logger.info('Backup cleanup completed');
  }

  _upload(filepath, filename) {
    return aws.uploadFile(filepath, config.backups.bucket, filename);
  }

  _mongodump() {
    let outputFile = path.join(config.backups.tmpDir, 'mongodump');
    let cmd = `mongodump --host ${config.mongodb.host} --db ${config.mongodb.database} --out ${outputFile}`;
    return this.exec(cmd);
  }

  async _mongorestore(file) {
    let col = await mongo.packagesCollection();
    await col.remove({});
    col = await mongo.getStatsCollection();
    await col.remove({});
    col = await mongo.githubTeamCollection();
    await col.remove({});
    col = await mongo.getDoiCollection();
    await col.remove({});

    let cmd = `mongorestore --host ${config.mongodb.host} ${file}`;
    return this.exec(cmd);
  }

  _zip(zipFile, file, cwd) {
    return this.exec(`zip -r ${zipFile} ${file}`, {cwd});
  }

  _unzip(zipFile, cwd) {
    return this.exec(`unzip ${zipFile}`, {cwd});
  }

  exec(cmd, options={}) {
    return new Promise((resolve, reject) => {
      options.shell = '/bin/bash';
      exec(cmd, options, (error, stdout, stderr) => {
        if( error ) reject(error);
        else resolve({stdout, stderr});
      });
    });
  }
}

module.exports = new BackupModel();