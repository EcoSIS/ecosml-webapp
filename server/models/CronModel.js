const CronJob = require('cron').CronJob;
const config = require('../lib/config');
const BackupModel = require('./BackupModel');
const regRepos = require('../lib/registered-repositories');
const logger = require('../lib/logger');
const mongo = require('../lib/mongo');

class Cron {

  constructor() {
    this.job = new CronJob(config.cron.time, () => {
      this.run();
    }, null, true, 'America/Los_Angeles');
    this.job.start();
  }


  async run() {
    logger.info('Running cron tasks');

    try {
      let collection = await mongo.packagesCollection();
      let pkgs = await collection.find({source: 'registered'}, {}).toArray();
      for( let pkg of pkgs ) {
        try {
          await regRepos.syncPropertiesToMongo(pkg);
        } catch(e) {
          logger.error('Cron package sync error: ', e);
        }
      }
    } catch(e) {
      logger.error('Cron error: ', e);
    }

    try {
      await BackupModel.run();
    } catch(e) {
      logger.error('Cron error: ', e);
    }
  }
}

new Cron();