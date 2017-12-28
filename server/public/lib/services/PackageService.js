const {BaseService} = require('@ucd-lib/cork-app-utils');
const PackageStore = require('../stores/PackageStore');
const uuid = require('uuid');

class PackageService extends BaseService {

  constructor() {
    super();
    this.store = PackageStore;
    this.baseUrl = '/api/package'
  }

  /**
   * @method create
   * @description create a new package
   * 
   * @param {String} name name of package 
   * @param {String} description one sentence overview description
   */
  async create(name, description) {
    let payload = {name, description};

    return this.request({
      url : this.baseUrl,
      fetchOptions : {
        method : 'POST',
        body  : payload
      },
      json : true,
      onLoading : request => this.store.setCreatePackageLoading(request, payload),
      onLoad : result => this.store.setCreatePackageSuccess(result.body),
      onError : error => this.store.setCreatePackageError(error)
    })
  }

  async update(pkg) {
    let payload = pkg;

    return this.request({
      url : this.baseUrl,
      fetchOptions : {
        method : 'PATCH',
        body  : payload
      },
      json : true,
      onLoading : request => this.store.setUpdatePackageLoading(request, payload),
      onLoad : result => this.store.setUpdatePackageSuccess(result.body),
      onError : error => this.store.setUpdatePackageError(error)
    })
  }

  /**
   * @method createRelease
   * @description create a new package release
   */
  async createRelease(id, payload) {
    return this.request({
      url : `${this.baseUrl}/${id}/createRelease`,
      fetchOptions : {
        method : 'POST',
        body  : payload
      },
      json : true,
      onLoading : request => this.store.setCreateReleaseLoading(request, payload),
      onLoad : result => this.store.setCreateReleaseSuccess(result.body),
      onError : error => this.store.setCreateReleaseError(error)
    });
  }

  /**
   * @method get
   * @description get a package by id.  the /package/:id request also 
   * accepts /package/:name
   * 
   * @param {String} id package ecosml id 
   */
  async get(id) {
    return this.request({
      url : `${this.baseUrl}/${id}`,
      onLoading : request => this.store.setGetPackageLoading(id, request),
      onLoad : result => this.store.setGetPackageSuccess(id, result.body),
      onError : error => this.store.setGetPackageError(id, error)
    });
  }

  async delete(name) {
    return this.request({
      url : `${this.baseUrl}/${name}`,
      fetchOptions : {
        method : 'DELETE'
      },
      onLoading : request => this.store.setDeletingPackage(request, payload),
      onLoad : result => this.store.setDeletePackageSuccess(result.body),
      onError : error => this.store.setDeletePackageError(error)
    });
  }

  async addFile(formData) {
    let id = uuid.v4();
    let filename = formData.get('filename'); 
    let payload = {filename};

    return this.request({
      url : `${this.baseUrl}/addFile`,
      fetchOptions : {
        method : 'POST',
        body : formData
      },
      onLoading : request => this.store.setFileSaving(request, fileId, payload),
      onLoad : result => this.store.setFileSaved(fileId, payload),
      onError : error => this.store.setFileSaveError(fileId, error)
    });
  }
}

module.exports = new PackageService();