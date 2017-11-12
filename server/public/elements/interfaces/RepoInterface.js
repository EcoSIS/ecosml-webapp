
module.exports = subclass => 
  class RepoInterface extends subclass {

    constructor() {
      super();
      this._injectModel('RepoModel');
    }

    _getRepoSchema() {
      return this.RepoModel.schema;
    }

    async _getRepo(id) {
      return this.RepoModel.get(id);
    }

    async _createRepo(name, overview) {
      return this.RepoModel.create(name, overview);
    }

    async _updateRepo(data) {
      return this.RepoModel.update(data);
    }


  }