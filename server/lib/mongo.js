const mongodb = require('mongodb');
const logger = require('./logger');
const config = require('./config');

class MongoDB {

  conn() {
    if( this.db ) return this.db

    return new Promise((resolve, reject) => {
      mongodb.connect(config.mongodb.url, (error, db) => {
        db.on('close', e => {
          logger.warn('MongoDB connection closed', e);
          this.db = null;
        });

        if( error ) {
          reject(error);
        } else {
          this.db = db;
          logger.info('MongoDB connected');
          resolve(db);
        }
      });
    });
  }

  async reposCollection() {
    await this.conn();
    return this.db.collection(config.mongodb.collections.repos);
  }

  async insertRepository(repo) {
    let collection = await this.reposCollection();
    await collection.insert(repo);
  }

  async removeRepository(repoName) {
    let collection = await this.reposCollection();
    await collection.remove({name: repoName});
  }

}

module.exports = new MongoDB();