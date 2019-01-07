const {BaseStore} = require('@ucd-lib/cork-app-utils');

class AuthStore extends BaseStore {

  constructor() {
    super();

    this.AUTH_STATES = {
      LOGGED_IN : 'loggedIn',
      NOT_LOGGED_IN : 'notLoggedIn'
    }

    this.data = {
      auth : {
        state : this.AUTH_STATES.NOT_LOGGED_IN
      },
      organizations : {
        state : this.STATE.INIT
      },
      saveGithubInfo : {
        state : this.STATE.INIT
      }
    };

    this.events = {
      AUTH_UPDATE : 'auth-update',
      ORGS_UPDATE : 'orgs-update',
      GITHUB_USERNAME_UPDATE : 'github-username-update'
    }
  }

  logout() {
    this._setAuthState({
      state : this.AUTH_STATES.NOT_LOGGED_IN
    });
    
    this._setOrgState({
      payload : [],
      state : this.STATE.INIT
    });
  }

  setAuthLoading(request, username) {
    this._setAuthState({request, username, state : this.STATE.LOADING});
    this._setOrgState({request, state : this.STATE.LOADING});
  }

  setAuthLoaded(payload) {
    this._setAuthState({
      username: payload.username,
      state : this.AUTH_STATES.LOGGED_IN
    });

    if( !payload.organizations ) return;
    this._setOrgState({
      payload : payload.organizations,
      state : this.STATE.LOADED
    });
  }

  setAuthError(error) {
    this._setAuthState({
      error,
      state : this.AUTH_STATES.NOT_LOGGED_IN
    });
    
    this._setOrgState({
      error,
      payload : [],
      state : this.STATE.ERROR
    });
  }

  _setAuthState(state) {
    this.data.auth = state;
    this.emit(this.events.AUTH_UPDATE, state);
  }

  setOrgsLoading(request) {
    this._setOrgState({request, state : this.STATE.LOADING});
  }

  setOrgsLoaded(payload) {
    this._setOrgState({payload, state : this.STATE.LOADED});
  }

  setOrgsError(error) {
    this._setOrgState({error, state : this.STATE.ERROR});
  }

  _setOrgState(state) {
    if( !state.state ) console.warn('Setting orgs with no state');
    this.data.organizations = state;
    this.emit(this.events.ORGS_UPDATE, state);
  }

  setGithubUsernameSaving(request, username) {
    this._setGithubState({request, payload: username, state: this.STATE.SAVING});
  }

  setGithubUsernameSaved(username) {
    this._setGithubState({payload: username, state: this.STATE.SAVE_SUCCESS});
  }

  setGithubUsernameSaveError(error, username) {
    this._setGithubState({error, payload: username, state: this.STATE.SAVE_ERROR});
  }

  _setGithubState(state) {
   this.data.saveGithubInfo = state;
    this.emit(this.events.GITHUB_USERNAME_UPDATE, state);
  }
}

module.exports = new AuthStore();