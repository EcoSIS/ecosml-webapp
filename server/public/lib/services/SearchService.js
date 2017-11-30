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
  async search(query, options) {
    let payload = {query, options};
    
    this.currentSearchId++;
    let searchId = this.currentSearchId;
    

    return this.request({
      url : this.baseUrl,
      fetchOptions : {
        method : 'POST',
        body  : payload
      },
      json : true,
      onLoading : request => {
        if( !this._isCurrentSearch(searchId) ) return;
        this.store.setSearchLoading(request, payload)
      },
      onLoad : result => {
        if( !this._isCurrentSearch(searchId) ) return;
        this.store.setSearchSuccess(result.body)
      },
      onError : error => {
        if( !this._isCurrentSearch(searchId) ) return;
        this.store.setSearchError(error)
      }
    })
  }

  _isCurrentSearch(id) {
    return (id === this.currentSearchId);
  }
}

module.exports = new SearchService();