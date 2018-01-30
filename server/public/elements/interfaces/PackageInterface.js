
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

    async _createPackage(name, overview, organization) {
      return this.PackageModel.create(name, overview, organization);
    }

    async _updatePackage(pkg, msg) {
      return this.PackageModel.update(pkg, msg);
    }

    async _deletePackage(name) {
      return this.PackageModel.delete(name);
    }

  }