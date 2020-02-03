const {BaseStore} = require('@ucd-lib/cork-app-utils');

class DoiStore extends BaseStore {

  constructor() {
    super();

    this.data = {
      dois : {},
      search : {
        state : this.STATE.INIT
      }
    };
    this.events = {
      GET_DOI_UPDATE : 'get-doi-update'
    }
  }

  setGetDoiLoading(request, id) {
    this._setGetDoiState({
      id, request,
      state : this.STATE.LOADING
    })
  }

  setGetDoiLoaded(payload, id) {
    this._setGetDoiState({
      id, payload,
      state : this.STATE.LOADING
    })
  }

  setGetDoiError(error, id) {
    this._setGetDoiState({
      id, error,
      state : this.STATE.ERROR
    })
  }

  _setGetDoiState(state) {
    this.data.dois[state.id] = state;
    this.emit(this.events.GET_DOI_UPDATE, state);
  }

  setSearchLoading(request, query) {
    this._setSearchState({request, query, state: this.STATE.LOADING});
  }

  setSearchLoaded(payload, query) {
    this._setSearchState({payload, query, state: this.STATE.LOADED});
  }

  setSearchError(error, query) {
    this._setSearchState({error, query, state: this.STATE.ERROR});
  }

  _setSearchState(state) {
    this.data.search = state;
    this.emit(this.events.SEARCH_PACKAGES_UPDATE, this.data.search);
  }
}


module.exports = new DoiStore();