const {BaseService} = require('@ucd-lib/cork-app-utils');
const PackageStore = require('../stores/PackageStore');

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
   * @param {String} host
   * @param {String} overview one sentence overview description
   * @param {String} organization package organization
   * @param {String} language package programming language
   */
  async create(name, host, overview, organization, language, packageType, source) {
    let payload = {name, host, overview, organization, language, packageType, source};

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

  async update(pkgNameOrId, pkg, msg) {
    let payload = {
      update: pkg, 
      message: msg
    };

    return this.request({
      url : this.baseUrl+'/'+encodeURIComponent(pkgNameOrId),
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
  async createRelease(pkgNameOrId, payload) {
    return this.request({
      url : `${this.baseUrl}/${encodeURIComponent(pkgNameOrId)}/createRelease`,
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
   * @param {String} packageId package ecosml id 
   */
  async get(packageId) {
    packageId = packageId.replace(/^\//, '');

    return this.request({
      url : `${this.baseUrl}/${packageId}`,
      onLoading : request => this.store.setGetPackageLoading(packageId, request),
      onLoad : result => this.store.setGetPackageSuccess(packageId, result.body),
      onError : error => this.store.setGetPackageError(packageId, error)
    });
  }

  async getFiles(packageId) {    
    return this.request({
      url : `${this.baseUrl}/${encodeURIComponent(packageId)}/files`,
      onLoad : result => this.store.onFilesLoaded(packageId, result.body.files)
    });
  }

  async delete(packageId) {
    return this.request({
      url : `${this.baseUrl}/${encodeURIComponent(packageId)}`,
      fetchOptions : {
        method : 'DELETE'
      },
      onLoading : request => this.store.setDeletingPackage(request, packageId),
      onLoad : result => this.store.setDeletePackageSuccess(result.body),
      onError : error => this.store.setDeletePackageError(error)
    });
  }

  // moveExample(packageId, src, dst) {
  //   return this.request({
  //     url : `${this.baseUrl}/${packageId}/example/${src}`,
  //     fetchOptions : {
  //       method : 'MOVE',
  //       body : dst
  //     }
  //   });
  // }

  // deleteExample(packageId, name) {
  //   return this.request({
  //     url : `${this.baseUrl}/${packageId}/example/${name}`,
  //     fetchOptions : {
  //       method : 'DELETE'
  //     }
  //   });
  // }

  // TODO: move to package editor service?
  previewMarkdown(markdown, pkgName) {
    return this.request({
      url : `/api/markdown/${encodeURIComponent(pkgName)}`,
      fetchOptions : {
        method : 'POST',
        headers : {
          'Content-Type' : 'text/plain'
        },
        body : markdown
      },
      onLoading : request => this.store.setMarkdownLoading(pkgName, request),
      onLoad : result => this.store.setMarkdownLoaded(pkgName, result.body),
      onError : error => this.store.setMarkdownError(pkgName, error)
    });
  }
}

module.exports = new PackageService();