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
      GET_DOI_UPDATE : 'doi-update'
    }
  }

  setGetDoiLoading(request, id) {
    this._setDoiState({
      id, request,
      state : this.STATE.LOADING
    })
  }

  setGetDoiLoaded(payload, id) {
    this._setDoiState({
      id, payload,
      state : this.STATE.LOADED
    })
  }

  setGetDoiError(error, id) {
    this._setDoiState({
      id, error,
      state : this.STATE.ERROR
    })
  }

  setDoiSaving(request, action, doi) {
    this._setDoiState({
      id : doi.id,
      request, action,
      payload : doi,
      state : this.STATE.SAVING
    })
  }

  setDoiSaved(doi) {
    this._setDoiState({
      id : doi.id,
      payload : doi,
      state : this.STATE.LOADED
    });
  }

  setDoiSaveError(error, action, doi) {
    this._setDoiState({
      id : doi.id,
      payload : doi,
      error, action,
      state : this.STATE.SAVE_ERROR
    });
  }

  _setDoiState(state) {
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