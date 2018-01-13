const mongodb = require('mongodb');
const logger = require('../logger');
const config = require('../config');
const mapReduce = require('./mapReduce');

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

  async createPackageIndexes() {
    let collection = await this.packagesCollection();
    let indexes = config.mongodb.indexes.package;

    let results = [];
    for( var i = 0; i < indexes.length; i++ ) {
      let index = indexes[i];
      let result = await collection.createIndex(index.index, index.options);
      results.push(result);
    }

    return results;
  }

  async recreatePackageIndexes() {
    let collection = await this.packagesCollection();
    let indexes = config.mongodb.indexes.package;

    let results = [];
    for( var i = 0; i < indexes.length; i++ ) {
      let index = indexes[i];

      try {
        await collection.dropIndex(index.options.name);
      } catch(e) {}

      let result = await collection.createIndex(index.index, index.options);
      results.push(result);
    }

    return results;
  }

  async search(query = {}, options = {}, projection = {}) {
    let offset = options.offset || 0;
    let limit = options.limit || 10;
    if( limit > 100 ) limit = 100;
    let sort = options.sort || {name: 1};

    let collection = await this.packagesCollection();

    let total = await collection.count(query);
    let results = await collection
                    .find(query, options)
                    .limit(limit)
                    .skip(offset)
                    .sort(sort)
                    .toArray();
    
    let filters = await mapReduce(collection, query);
    if( filters.length == 0 ) filters = {};
    else filters = filters[0].value;

    return {
      offset, limit, sort,
      filters, total, results
    }
  }

  async getAllPackageNames() {
    let collection = await this.packagesCollection();
    return await collection.find({}, {name: 1, id: 1}).toArray();
  }

  /**
   * @method insertPackage
   * @description insert or update a package
   */
  async insertPackage(pkg) {
    let collection = await this.packagesCollection();
    return await collection.update({id: pkg.id}, pkg, {upsert: true});
  }

  /**
   * @method updatePackage
   * @description update package data.  this will patch provided data.
   * 
   * @param {String} packageNameOrId package name or id
   * @param {Object} data package data to update
   * 
   * @returns {Promise}
   */
  async updatePackage(packageNameOrId, data) {
    let collection = await this.packagesCollection();
    return await collection.update({
      $or : [
        {name: packageNameOrId},
        {id : packageNameOrId}
      ]
    }, {
      $set: data
    });
  }

  /**
   * @method getPackage
   * @description get a package by name or id
   * 
   * @param {String} packageNameOrId
   * @param {Object} project
   * 
   * @returns {Promise} resolves to mongo response
   */
  async getPackage(packageNameOrId, projection = {}) {
    let collection = await this.packagesCollection();
    return collection.findOne({
      $or : [
        {name: packageNameOrId},
        {id : packageNameOrId}
      ]
    }, projection);
  }

  /**
   * @method removePackage
   * @description remove a package by name or id
   * 
   * @param {String} packageNameOrId
   * 
   * @returns {Promise} resolves to mongo response
   */
  async removePackage(packageNameOrId) {
    let collection = await this.packagesCollection();
    return collection.remove({
      $or : [
        {name: packageNameOrId},
        {id : packageNameOrId}
      ]
    });
  }

}

module.exports = new MongoDB();