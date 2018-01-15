const {BaseModel} = require('@ucd-lib/cork-app-utils');
const AuthService = require('../services/AuthService');
const AuthStore = require('../stores/AuthStore');

class AuthModel extends BaseModel {

  constructor() {
    super();

    this.store = AuthStore;
    this.service = AuthService;
      
    this.register('AuthModel');
  }

  login(username, password) {
    return this.service.login(username, password);  
  }

  logout() {
    this.store.logout();
  }

  async getUserOrganizations(reload=false) {
    if( reload ) {
      this.service.getUserOrgs();
    }
    
    if( this.store.data.organizations.state === this.store.STATE.LOADING ) {
      await this.store.data.organizations.request;
    }

    return this.store.data.organizations;
  }

}

module.exports = new AuthModel();