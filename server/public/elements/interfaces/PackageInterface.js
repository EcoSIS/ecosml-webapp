
module.exports = subclass => 
  class PackageInterface extends subclass {

    constructor() {
      super();
      this._injectModel('PackageModel');
    }

    _getPackageSchema() {
      return this.PackageModel.schema;
    }

    async _getPackage(id) {
      return this.PackageModel.get(id);
    }

    async _createPackage(name, overview) {
      return this.PackageModel.create(name, overview);
    }

    async _deletePackage(name) {
      return this.PackageModel.delete(name);
    }

    async _updatePackage(data) {
      return this.PackageModel.update(data);
    }
  }