const mongodb = require('mongodb');
const logger = require('../logger');
const config = require('../config');
const queryMapReduce = require('./query-map-reduce');
const statsMapReduce = require('./stats-map-reduce');

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

  disconnect() {
    this.db.close();
  }

  async packagesCollection() {
    await this.conn();
    return this.db.collection(config.mongodb.collections.package);
  }

  async getStatsCollection() {
    await this.conn();
    return this.db.collection(config.mongodb.collections.stats);
  }

  async githubTeamCollection() {
    await this.conn();
    return this.db.collection(config.mongodb.collections.githubTeam);
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

  async recreateGithubTeamIndexes() {
    let collection = await this.githubTeamCollection();
    let indexes = config.mongodb.indexes['github-team'];

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

  /**
   * @method search
   */
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
    
    let filters = await queryMapReduce(collection, query);
    if( filters.length == 0 ) filters = {};
    else filters = filters[0].value;

    return {
      offset, limit, sort,
      filters, total, results
    }
  }

  async getAllPackageNames() {
    let collection = await this.packagesCollection();
    return collection.find({}, {name: 1, id: 1}).toArray();
  }

  /**
   * @method getAllOrgPackageNames
   * @description get all package names for an org
   * 
   * @param {String} orgName organization name
   * 
   * @returns {Promise} resolves to mongo db result
   */
  async getAllOrgPackageNames(orgName) {
    let collection = await this.packagesCollection();
    return collection.find({organization: orgName}, {name: 1, id: 1, githubId: 1}).toArray();
  }

  async getAllRegisteredRepositoryIds() {
    let collection = await this.packagesCollection();
    return collection
      .find({source: 'registered'}, {name: 1, id: 1})
      .toArray();
  }

  /**
   * @method insertPackage
   * @description insert or update a package
   */
  async insertPackage(pkg) {
    let collection = await this.packagesCollection();
    let result = collection.update({id: pkg.id}, pkg, {upsert: true});
    this.updateStats(); // don't wait for this
    return result;
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
    let result = await collection.update({
      $or : [
        {name: packageNameOrId},
        {id : packageNameOrId}
      ]
    }, {
      $set: data
    });

    this.updateStats(); // don't wait for this

    return result
  }

  /**
   * @method getPackage
   * @description get a package by name or id.  id can be ecosml
   * id or GitHub id
   * 
   * @param {String} packageNameOrId
   * @param {Object} project
   * 
   * @returns {Promise} resolves to mongo response
   */
  async getPackage(packageNameOrId, projection = {}) {
    if( typeof packageNameOrId === 'object' ) {
      packageNameOrId = packageNameOrId.id || packageNameOrId.name;
    }

    let collection = await this.packagesCollection();
    return collection.findOne({
      $or : [
        {name: packageNameOrId},
        {id : packageNameOrId},
        {githubId : packageNameOrId}
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
    let result = await collection.remove({
      $or : [
        {name: packageNameOrId},
        {id : packageNameOrId}
      ]
    });

    this.updateStats(); // don't wait for this

    return result;
  }

  /**
   * @method insertGithubTeam
   * @description insert or update a github team
   */
  async insertGithubTeam(team) {
    let collection = await this.githubTeamCollection();
    return collection.update({id: team.id}, team, {upsert: true});
  }

  /**
   * @method removeGithubTeam
   * @description remove a github team by slug or id
   * 
   * @param {String} teamSlugOrId
   * 
   * @returns {Promise} resolves to mongo response
   */
  async removeGithubTeam(teamSlugOrId) {
    let collection = await this.githubTeamCollection();
    return collection.remove({
      $or : [
        {slug: teamSlugOrId},
        {id : teamSlugOrId}
      ]
    });
  }

  /**
   * @method getGithubTeam
   * @description get a github team by slug or id
   * 
   * @param {String} teamSlugOrId 
   */
  async getGithubTeam(teamSlugOrId) {
    let collection = await this.githubTeamCollection();
    return collection.findOne({
      $or : [
        {slug: teamSlugOrId},
        {id : teamSlugOrId}
      ]
    });
  }

  /**
   * @method getAllGithubTeamNames
   * @description return all slug and ids for all teams in
   * github-team collection
   * 
   * @return {Promise} resolves to Array
   */
  async getAllGithubTeamNames() {
    let collection = await this.githubTeamCollection();
    return collection.find({}, {slug: 1, id: 1}).toArray();
  }

  /**
   * @method updateStats
   * @description update stats via mapreduce. Should be called
   * any time package updates
   * 
   * @return {Promise}
   */
  async updateStats() {
    let collection = await this.packagesCollection();
    return statsMapReduce(collection);
  }

  /**
   * @method getStats
   * @description get all stats in stats collection
   * 
   * @return {Promise} resolve to array
   */
  async getStats() {
    let collection = await this.getStatsCollection();
    return collection.find({}).toArray();
  }

}

module.exports = new MongoDB();