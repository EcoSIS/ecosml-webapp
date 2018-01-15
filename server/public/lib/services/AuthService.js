const {BaseService} = require('@ucd-lib/cork-app-utils');
const AuthStore = require('../stores/AuthStore');

class AuthService extends BaseService {

  constructor() {
    super();
    this.store = AuthStore;
    this.baseUrl = '/auth';
  }

  async login(username, password) {
    return this.request({
      url : `${this.baseUrl}/login`,
      fetchOptions : {
        method : 'POST',
        body : {username, password}
      },
      onLoading : request => this.store.setAuthLoading(request, username),
      onLoad : result => this.store.setAuthLoaded(result.body),
      onError : error => this.store.setAuthError(error)
    });
  }

  async getUserOrgs() {
    return this.request({
      url : `${this.baseUrl}/organizations`,
      onLoading : request => this.store.setOrgsLoading(request),
      onLoad : result => this.store.setAuthLoaded(result.body),
      onError : error => this.store.setAuthError(error)
    });
  }

}

module.exports = new AuthService();