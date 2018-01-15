module.exports = subclass => 
  class AuthInterface extends subclass {

    constructor() {
      super();
      this._injectModel('AuthModel');
    }

    _login(username, password) {
      return this.AuthModel.login();
    }

    _logout() {
      return this.AuthModel.logout();
    }

    _getUserOrganizations() {
      return this.AuthModel.getUserOrganizations();
    }

    _getAuthState() {
      return this.AuthModel.get();
    }

  }