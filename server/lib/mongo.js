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

  async reposCollection() {
    await this.conn();
    return this.db.collection(config.mongodb.collections.repos);
  }

  async insertRepository(repo) {
    let collection = await this.reposCollection();
    return await collection.insert(repo);
  }

  async getRepository(repoNameOrId) {
    let collection = await this.reposCollection();
    return await collection.findOne({
      $or : [
        {name: repoNameOrId},
        {id : repoNameOrId}
      ]
    });
  }

  async removeRepository(repoName) {
    let collection = await this.reposCollection();
    return await collection.remove({name: repoName});
  }

}

module.exports = new MongoDB();