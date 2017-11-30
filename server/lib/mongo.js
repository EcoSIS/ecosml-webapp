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
    return await collection
                    .find(query, options)
                    .limit(limit)
                    .skip(offset)
                    .sort(sort)
                    .toArray();
  }

  async getAllPackageNames() {
    let collection = await this.packagesCollection();
    return await collection.find({}, {name: 1, id: 1}).toArray();
  }

  async insertPackage(pkg) {
    let collection = await this.packagesCollection();
    return await collection.insert(pkg);
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

class FilterCountMapReduce {

  constructor(collection, query) {
    this.collection = collection;

    let filterNames = [];
    let filterParts = [];
    let filters = config.db.indexedFilters.slice(0);

    for( var i = 0; i < filters.length; i++ ) {
      var name = filters[i].replace(/.*\./, '');
      filterNames.push(name);
      filterParts.push(filters[i].split('.'));
    }


    this.config = {
      out : {
        inline: 1
      },
      query : query,
      scope : {
        filterNames : filterNames,
        filterParts : filterParts,
        MAX_FILTERS : 50
      },
      finalize : this.finalize()
    }
  }

  run() {
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;

      this.collection.mapReduce(this.map, this.reduce, this.onComplete, this.config);
    });
  }

  map() {
    function getValues(obj, index, parts) {
      if( index == parts.length-1 ) {
        return obj[parts[index]];
      } else {
        obj = obj[parts[index]];
        index++;
        return getValues(obj, index, parts);
      }
    }

    var i, values, j, item = {};
    for( i = 0; i < filterNames.length; i++ ) {
      values = getValues(this, 0, filterParts[i]);
      item[filterNames[i]] = {};


      if( typeof values == 'string' ) {
        item[filterNames[i]][values] = 1;
      } else if ( Array.isArray(values) ) {
        for( j = 0; j < values.length; j++ ) {
          item[filterNames[i]][values[j]] = 1;
          if( j == MAX_FILTERS ) break;
        }
      }
    }

    emit(null, item);
  }

  reduce(id, items) {
    var result = {}, item, i, j, filter, key;

    if( items.length == 0 ) {
      for( i = 0; i < filterNames.length; i++ ) {
        result[filterNames[i]] = {};
      }
      return result;
    } else {
      result = items[0];
    }

    for( i = 1; i < items.length; i++ ) {
      item = items[i];
      for( j = 0; j < filterNames.length; j++ ) {
        filter = item[filterNames[j]];

        for( key in filter ) {
          if( !result[filterNames[j]][key] ) {
            result[filterNames[j]][key] = filter[key];
          } else {
            result[filterNames[j]][key] += filter[key];
          }
        }
      }
    }

    return result;
  }

  finalize(key, result){
    var arr, i;
    for( filter in result ) {
      arr = [];
      for( value in result[filter] ) {
        arr.push({
          filter : value,
          count : result[filter][value]
        });
      }

      arr.sort(function(a, b){
          if( a.count > b.count ) return -1;
          if( a.count < b.count ) return 1;
          return 0;
      });

      result[filter] = arr;
    }
    return result;
  }

  onComplete(err, result) {
    if( err ) return this.reject(err);
    else if( result.length == 0 ) this.resolve({});
    else this.resolve(result[0].value);
  }

}

module.exports = new MongoDB();