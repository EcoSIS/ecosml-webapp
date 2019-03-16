const {BaseModel} = require('@ucd-lib/cork-app-utils');
const AuthService = require('../services/AuthService');
const AuthStore = require('../stores/AuthStore');

class AuthModel extends BaseModel {

  constructor() {
    super();

    this.store = AuthStore;
    this.service = AuthService;
      
    this.register('AuthModel');

    if( typeof APP_CONFIG !== 'undefined' && APP_CONFIG.user) {
      this.store.setAuthLoaded({username: APP_CONFIG.user});
      this.getUserOrganizations();
    }
  }

  get() {
    return this.store.data.auth;
  }

  async login(username, password) {
    await this.service.login(username, password);
    if( this.store.data.auth.state === 'loggedIn' ) {
      if( typeof window !== undefined ) {
        window.location.reload();
      }
    }
  }

  async logout() {
    await this.service.logout();
    if( typeof window !== undefined ) {
      window.location.reload();
    }
  }

  async getUserOrganizations(reload=false) {
    if( reload || this.store.data.organizations.state === this.store.STATE.INIT ) {
      this.service.getUserOrgs();
    }
    
    if( this.store.data.organizations.state === this.store.STATE.LOADING ) {
      await this.store.data.organizations.request;
    }

    return this.store.data.organizations;
  }


  /**
   * @method authorizeGithub
   * @description walk user through GitHub Oauth flow to link EcoSML and GitHub accounts
   */
  authorizeGithub() {
    if( typeof window === undefined ) return;
    window.location = '/auth/github-authorize';
  }

  /**
   * @method revokeGithub
   * @description unlink EcoSML and GitHub accounts
   */
  revokeGithub() {
    if( typeof window === undefined ) return;
    window.location = '/auth/github-revoke';
  }

}

module.exports = new AuthModel();