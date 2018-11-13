const {BaseService} = require('@ucd-lib/cork-app-utils');
const PackageEditorStore = require('../stores/PackageStore');

class PackageEditorService extends BaseService {

  constructor() {
    super();
    this.store = PackageEditorStore;
    this.baseUrl = '/api/package'
  }

  isNameAvailable(packageName) {
    return this.request({
      url : `${this.baseUrl}/available/${packageName}`
    });
  }

}

module.exports = new PackageEditorService();