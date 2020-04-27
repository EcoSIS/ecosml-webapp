const {BaseService} = require('@ucd-lib/cork-app-utils');
const PackageEditorStore = require('../stores/PackageEditorStore');
const PackageStore = require('../stores/PackageStore')

class PackageEditorService extends BaseService {

  constructor() {
    super();
    this.store = PackageEditorStore;
    this.baseUrl = '/api/package'
  }

  isNameAvailable(host, packageName, org='') {
    if( org ) {
      org = '?org='+org;
    }

    return this.request({
      url : `${this.baseUrl}/available/${host}/${packageName}${org}`
    });
  }

  isValid(host, packageName, org='ecosml') {
    return this.request({
      url : `${this.baseUrl}/valid/${host}/${org}/${packageName}`
    });
  }

  syncRegProps(packageId) {
    return this.request({
      url : `${this.baseUrl}/${encodeURIComponent(packageId)}/syncRegProps`,
      onLoad : response => this.store.setData(
        {
          description : response.body.description,
          overview : response.body.overview,
          releases : response.body.releases,
          releaseCount : response.body.releaseCount
        }, 
        {merge:true}
      )
    });
  }

}

module.exports = new PackageEditorService();