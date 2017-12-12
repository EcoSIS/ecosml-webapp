const {BaseStore} = require('@ucd-lib/cork-app-utils');

class SearchStore extends BaseStore {

  constructor() {
    super();

    this.data = {
      search : {
        state : this.STATE.INIT
      }
    }

    this.events = {
      'SEARCH_PACKAGES_UPDATE' : 'search-packages-update'
    }
  }

  getSearchQuery() {
    return this.data.search.query;
  }

  setSearchQuery(query) {
    this.data.search.query = query;
  }

  setSearchLoading(request, query) {
    this._setSearchState({request, query, state: this.STATE.LOADING});
  }

  setSearchSuccess(payload, query) {
    this._setSearchState({payload, query, state: this.STATE.LOADED});
  }

  setSearchError(error) {
    this._setSearchState({error, query, state: this.STATE.ERROR});
  }

  _setSearchState(state) {
    this.data.search = state;
    this.emit(this.events.SEARCH_PACKAGES_UPDATE, this.data.search);
  }
}

module.exports = new SearchStore();