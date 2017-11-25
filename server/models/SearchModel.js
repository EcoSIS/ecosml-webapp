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
  async search(query = {}, options = {}, projection = {}) {
    logger.info('package search', query, options, projection);
    return await mongo.search(query, options, projection);
  }

  async recreateIndex() {
    // TODO, check auth
    return await mongo.recreateSeachIndex();
  }

}

module.exports = new SearchModel();