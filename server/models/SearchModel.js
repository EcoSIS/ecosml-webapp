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

    let mongoQuery = {};
    if( query.text ) {
      mongoQuery.$text = {$search: query.text};
    }
    if( query.filters && query.filters.length > 0 ) {
      mongoQuery.$and = query.filters;
    }

    let mongoOptions = {
      limit : query.limit || 10,
      offset : query.offset || 0,
      sort : query.sort || {name: 1}
    }

    logger.info('package search', mongoQuery, mongoOptions);
    let result = await mongo.search(mongoQuery, mongoOptions, {});

    // strip out any active filters
    if( query.filters && query.filters.length > 0 ) {
      query.filters.forEach(filter => {
        let key = Object.keys(filter)[0];
        let value = filter[key];
        if( typeof value === 'object' ) return;

        if( result.filters[key] ) {
          let index = result.filters[key].findIndex(item => item.filter === value);
          if( index > -1 ) result.filters[key].splice(index, 1);
          if( result.filters[key].length === 0 ) delete result.filters[key];
        }
      });
    }

    return result;
  }

  async recreateIndex() {
    // TODO, check auth
    return await mongo.recreatePackageIndexes();
  }

}

module.exports = new SearchModel();