
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

    async _updatePackage(packageId, data, msg) {
      return this.PackageModel.update(packageId, data, msg);
    }

    async _deletePackage(name) {
      return this.PackageModel.delete(name);
    }

    _createRelease(pkg, releaseInfo) {
      return this.PackageModel.createRelease(pkg, releaseInfo);
    }

    _previewMarkdown(markdown) {
      return this.PackageModel.previewMarkdown(markdown);
    }

    _uploadFile(options) {
      return this.PackageModel.uploadFile(options);
    }

    _setSelectedPackageId(packageId) {
      this.PackageModel.setSelectedPackageId(packageId);
    }

    _getPackageFiles(packageId) {
      return this.PackageModel.getFiles(packageId);
    }

  }