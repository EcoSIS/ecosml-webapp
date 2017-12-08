const mongo = require('../lib/mongo');
const logger = require('../lib/logger');

class SearchModel {

  /**
   * @method search
   * @description Search for packages
   * 
   * @param {Object} query standard mongodb query 
   * @param {Object} options options for query 
   * @param {Number} options.offset query offset 
   * @param {Number} options.limit query limit 
   * @param {Object} options.sort standard mongodb sort object 
   * @param {Object} projection standard mongodb projection object
   * 
   * @returns {Promise} mongodb query promise, resolves to array
   */
  async search(query = {}) {

    let mongoQuery = query.filters || {};
    if( query.text ) {
      mongoQuery.$text = {$search: query.text};
    }

    let mongoOptions = {
      limit : query.limit || 10,
      offset : query.offset || 0,
      sort : query.sort || {name: 1}
    }

    logger.info('package search', mongoQuery, mongoOptions);
    return await mongo.search(mongoQuery, mongoOptions, {});
  }

  async recreateIndex() {
    // TODO, check auth
    return await mongo.recreatePackageIndexes();
  }

}

module.exports = new SearchModel();