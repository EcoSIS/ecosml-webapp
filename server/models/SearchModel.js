const mongo = require('../lib/mongo');
const github = require('../lib/repository/github');
const logger = require('../lib/logger');
const utils = require('../lib/utils');

const REGEX_MATCH = /^\/.*\/$/;
const DATE_MATCH = /\d\d\d\d-\d\d-\d\dT\d\d:\d\d:.*/;

class SearchModel {

  /**
   * @method publicSearch
   * @description Search for packages, ensures release count is greater than 0
   * and that package is public
   * 
   * @param {Object} query standard mongodb query 
   * @param {String} query.text text search
   * @param {Array} query.filters mongodb filters array
   * @param {Number} query.offset query offset 
   * @param {Number} query.limit query limit 
   * @param {Object} query.sort standard mongodb sort object 
   * @param {Object} query.projection standard mongodb projection object
   * 
   * @returns {Promise} mongodb query promise, resolves to array
   */
  async publicSearch(query) {
    if( !query.filters ) query.filters = [];
    query.filters.push({releaseCount: {$gt: 0}});
    query.filters.push({private: false});
    return this.search(query);
  }

  /**
   * @method search
   * @description Search for packages
   * 
   * @param {Object} query standard mongodb query 
   * @param {String} query.text text search
   * @param {Array} query.filters mongodb filters array
   * @param {Number} query.offset query offset 
   * @param {Number} query.limit query limit 
   * @param {Object} query.sort standard mongodb sort object 
   * @param {Object} query.projection standard mongodb projection object
   * 
   * @returns {Promise} mongodb query promise, resolves to array
   */
  async search(query = {}) {

    let mongoQuery = {};
    if( query.text ) {
      mongoQuery.$text = {$search: query.text};
    }
    if( query.filters && query.filters.length > 0 ) {
      this._replaceDateAndRegex(query.filters);
      mongoQuery.$and = query.filters;
    }

    let mongoOptions = {
      limit : query.limit || 10,
      offset : query.offset || 0,
      sort : query.sort || {name: 1}
    }

    logger.info('package search', mongoQuery, mongoOptions);
    let result = await mongo.search(mongoQuery, mongoOptions, query.projection || {});

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

  /**
   * @method _replaceDateAndRegex
   * @description given a search query, replace stringified Date and Regex
   * objects with real instances
   * 
   * @param {Object|Array} obj 
   */
  _replaceDateAndRegex(obj) {
    if( Array.isArray(obj) ) {
      return obj.forEach(o => this._replaceDateAndRegex(o));
    } else if( typeof obj === 'object') {
      for( let key in obj ) {
        if( typeof obj[key] == 'object' ) {
          this._replaceDateAndRegex(obj[key]);
        } else if ( typeof obj[key] == 'string' && obj[key].match(DATE_MATCH) ) {
          obj[key] = new Date(obj[key]);
        } else if ( typeof obj[key] === 'string' && obj[key].match(REGEX_MATCH) ) {
          try {
            obj[key] = new RegExp(obj[key].replace(/\//g, ''), 'i');
          } catch(e) {}
        }
      }
    }
  }

  /**
   * @method reindexRepositories
   * @description
   */
  async reindexRepositories() {
    let repos = await github.listRepositories();
    let inserted = [];

    for( var i = 0; i < repos.length; i++ ) {
      await this.reindexRepository(repos[i].name);
      inserted.push(repos[i].name);
    }

    return inserted;
  }

  /**
   * @method reindexRepository
   * @description repository to reindex from Github
   * 
   * @param {String} repoName 
   */
  async reindexRepository(repoName) {
    // have to access api for release info
    let repo = await github.getRepository(repoName);
    repo = utils.githubRepoToEcosml(JSON.parse(repo.body));

    // assign any additional metadata fields
    let {response} = await github.getRawFile(repo.name, 'ecosml-metadata.json');
    if( response.body ) {
      let metadata = utils.ecosmlToMetadataFile(JSON.parse(response.body));
      repo = Object.assign(metadata, repo);
    }

    repo.releaseCount = (repo.releases || []).length;

    await mongo.insertPackage(repo);
    return repo;
  }

  /**
   * @method recreateIndex
   * @description recreate MongoDB search indexes
   */
  recreateIndex() {
    return mongo.recreatePackageIndexes();
  }

}

module.exports = new SearchModel();