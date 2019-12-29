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
        headers : {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify({username, password})
      },
      onLoading : request => this.store.setAuthLoading(request, username),
      onLoad : result => this.store.setAuthLoaded(result.body),
      onError : error => this.store.setAuthError(error)
    });
  }

  logout() {
    return this.request({
      url : `${this.baseUrl}/logout`,
      onLoading : request => {},
      onLoad : result => this.store.logout(),
      onError : error => console.error(error)
    });
  }

  getUserOrgs() {
    return this.request({
      url : `${this.baseUrl}/organizations`,
      onLoading : request => this.store.setOrgsLoading(request),
      onLoad : result => {
        if( result.body ) {
          result.body.sort((a, b) => {
            if( a.displayName.toLowerCase() < b.displayName.toLowerCase() ) return -1;
            if( a.displayName.toLowerCase() > b.displayName.toLowerCase() ) return 1;
            return 0;
          })
        }
        this.store.setOrgsLoaded(result.body)
      },
      onError : error => this.store.setOrgsError(error)
    });
  }

}

module.exports = new AuthService();