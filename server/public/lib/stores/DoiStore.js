const {BaseStore} = require('@ucd-lib/cork-app-utils');

class DoiStore extends BaseStore {

  constructor() {
    super();

    this.data = {
      dois : {}
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
}

module.exports = new DoiStore();