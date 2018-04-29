const mongo = require('../lib/mongo');
const github = require('../lib/github');
const logger = require('../lib/logger');
const utils = require('../lib/utils');

class SearchModel {

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