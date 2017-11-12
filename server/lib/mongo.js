const mongodb = require('mongodb');
const logger = require('./logger');
const config = require('./config');

class MongoDB {

  conn() {
    if( this.db ) return this.db

    return new Promise((resolve, reject) => {
      mongodb.connect(config.mongodb.url, (error, db) => {
        if( error ) {
          return reject(error);
        }

        db.on('close', e => {
          logger.warn('MongoDB connection closed', e);
          this.db = null;
        });

        this.db = db;
        logger.info('MongoDB connected');
        resolve(db);
      });
    });
  }

  async packagesCollection() {
    await this.conn();
    return this.db.collection(config.mongodb.collections.package);
  }

  async getAllPackageNames() {
    let collection = await this.packagesCollection();
    return await collection.find({}, {name: 1, id: 1}).toArray();
  }

  async insertPackage(package) {
    let collection = await this.packagesCollection();
    return await collection.insert(package);
  }

  async getPackage(packageNameOrId) {
    let collection = await this.packagesCollection();
    return await collection.findOne({
      $or : [
        {name: packageNameOrId},
        {id : packageNameOrId}
      ]
    });
  }

  async removePackage(packageNameOrId) {
    let collection = await this.packagesCollection();
    return await collection.remove({
      $or : [
        {name: packageNameOrId},
        {id : packageNameOrId}
      ]
    });
  }

}

module.exports = new MongoDB();