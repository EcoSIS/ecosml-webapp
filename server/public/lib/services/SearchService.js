const {BaseService} = require('@ucd-lib/cork-app-utils');
const SearchStore = require('../stores/SearchStore');

class SearchService extends BaseService {

  constructor() {
    super();
    this.store = SearchStore;
    this.baseUrl = '/api/search'
    this.currentSearchId = 0;
  }

  /**
   * @method search
   * @description search for packages
   * 
   * @param {Object} query mongo query object
   * @param {Object} options query options
   */
  async search(query) {    
    this.currentSearchId++;
    let searchId = this.currentSearchId;

    return this.request({
      url : this.baseUrl,
      fetchOptions : {
        method : 'POST',
        body  : query
      },
      json : true,
      onLoading : request => {
        if( !this._isCurrentSearch(searchId) ) return;
        this.store.setSearchLoading(request, query)
      },
      onLoad : result => {
        if( !this._isCurrentSearch(searchId) ) return;
        this.store.setSearchSuccess(result.body, query)
      },
      onError : error => {
        if( !this._isCurrentSearch(searchId) ) return;
        this.store.setSearchError(error, query)
      }
    })
  }

  _isCurrentSearch(id) {
    return (id === this.currentSearchId);
  }

  async getOwnerPackages(query) {
    return this.request({
      url : this.baseUrl+'/owner',
      fetchOptions : {
        method : 'POST',
        body  : query
      },
      json : true
    });
  }
}

module.exports = new SearchService();