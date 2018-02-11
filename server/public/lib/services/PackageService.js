const {BaseService} = require('@ucd-lib/cork-app-utils');
const PackageStore = require('../stores/PackageStore');
const upload = require('../upload');
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
   * @param {String} organization package organization
   */
  async create(name, description, organization) {
    let payload = {name, description, organization};

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

  async update(pkg, msg) {
    let payload = {pkg, msg};

    return this.request({
      url : this.baseUrl+'/'+pkg.name,
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
  async createRelease(name, payload) {
    return this.request({
      url : `${this.baseUrl}/${name}/createRelease`,
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
      checkCached : () => this.store.data.byId[id],
      onLoading : request => this.store.setGetPackageLoading(id, request),
      onLoad : result => this.store.setGetPackageSuccess(id, result.body),
      onError : error => this.store.setGetPackageError(id, error)
    });
  }

  async getFiles(id) {
    return this.request({
      url : `${this.baseUrl}/${id}`,
      onLoad : result => this.store.onFilesLoaded(id, result.body)
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


  /**
   * 
   */
  uploadFile(options) {
    options.url = `${baseUrl}/updateFile`;
    return new Promise(async (resolve, reject) => {
      
      options.onProgress = (e) => this.store.onFileUploadProgress(options.id, e);
      
      let file = {
        base : options.file.filename,
        dir : options.dir
      }
      this.store.onFileUploadStart(options.packageId, file);

      try {
        let response = await upload(options);
        let file = JSON.parse(response);
        this.store.onFileLoaded(options.packageId, file);
        resolve(response);
      } catch(e) {
        this.store.onFileError(options.packageId, file, e);
        reject(e);
      }
    });
  }

  deleteFile(packageId, dir, filename) {
    let file = {
      dir : dir,
      base : filename
    }

    return this.request({
      url : `${this.baseUrl}/${packageId}/${dir}/${filename}`,
      fetchOptions : {
        method : 'DELETE'
      },
      onLoading : request => this.store.setFileDeleteStart(request, packageId, file),
      onLoad : result => this.store.setFileDeleteSuccess(result.body, packageId, file),
      onError : error => this.store.onFileError(packageId, file, error)
    });
  }

  previewMarkdown(markdown) {
    return this.request({
      url : `/api/markdown`,
      fetchOptions : {
        method : 'POST',
        headers : {
          'Content-Type' : 'text/plain'
        },
        body : markdown
      }
    });
  }
}

module.exports = new PackageService();