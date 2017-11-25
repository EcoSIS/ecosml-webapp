const {BaseModel} = require('@ucd-lib/cork-app-utils');
const SearchService = require('../services/SearchService');
const SearchStore = require('../stores/SearchStore');

class SearchModel extends BaseModel {

  constructor() {
    super();

    this.store = SearchStore;
    this.service = SearchService;
      
    this.register('SearchModel');
  }

  search(query = {}, options = {}) {
    return this.service.search(query, options);
  }
}

module.exports = new SearchModel();