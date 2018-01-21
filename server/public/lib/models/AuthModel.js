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

  login(username, password) {
    return this.service.login(username, password);  
  }

  logout() {
    return this.service.logout();
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

}

module.exports = new AuthModel();