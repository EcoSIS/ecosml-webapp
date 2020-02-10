const {BaseStore} = require('@ucd-lib/cork-app-utils');

class DoiStore extends BaseStore {

  constructor() {
    super();

    this.data = {
      pkgDois : {},
      dois : {},
      search : {
        state : this.STATE.INIT
      }
    };
    this.events = {
      PACKAGE_DOIS_UPDATE : 'package-dois-update',
      DOI_UPDATE : 'doi-update'
    }
  }

  setGetDoiLoading(request, id) {
    this._setPackageDoisState({
      id, request,
      state : this.STATE.LOADING
    })
  }

  setGetDoiLoaded(payload, id) {
    this._setPackageDoisState({
      id, payload,
      state : this.STATE.LOADED
    })
  }

  setGetDoiError(error, id) {
    this._setPackageDoisState({
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


  _setPackageDoisState(state) {
    // fire events for all of the individual dois
    if( state.payload && state.payload.dois ) {
      state.payload.dois.forEach(doi => this._setDoiState({
        id : doi.id,
        payload : doi,
        state : this.STATE.LOADED
      }))
    }

    this.data.pkgDois[state.id] = state;
    this.emit(this.events.PACKAGE_DOIS_UPDATE, state);
  }

  _setDoiState(state) {
    this.data.dois[state.id+'-'+state.payload.tag] = state;
    this.emit(this.events.DOI_UPDATE, state);
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