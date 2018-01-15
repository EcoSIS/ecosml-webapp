module.exports = subclass => 
  class AuthInterface extends subclass {

    constructor() {
      super();
      this._injectModel('AuthModel');
    }

  }