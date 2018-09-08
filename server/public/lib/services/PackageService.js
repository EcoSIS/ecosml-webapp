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
   * @param {String} overview one sentence overview description
   * @param {String} organization package organization
   * @param {String} language package programming language
   */
  async create(name, overview, organization, language) {
    let payload = {name, overview, organization, language};

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
      url : this.baseUrl+'/'+pkgNameOrId,
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
      url : `${this.baseUrl}/${pkgNameOrId}/createRelease`,
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
    return this.request({
      url : `${this.baseUrl}/${packageId}`,
      checkCached : () => this.store.data.byId[packageId],
      onLoading : request => this.store.setGetPackageLoading(packageId, request),
      onLoad : result => this.store.setGetPackageSuccess(packageId, result.body),
      onError : error => this.store.setGetPackageError(packageId, error)
    });
  }

  async getFiles(packageId) {    
    return this.request({
      url : `${this.baseUrl}/${packageId}/files`,
      onLoad : result => this.store.onFilesLoaded(packageId, result.body.files, result.body.specialDirs)
    });
  }

  async delete(packageId) {
    return this.request({
      url : `${this.baseUrl}/${packageId}`,
      fetchOptions : {
        method : 'DELETE'
      },
      onLoading : request => this.store.setDeletingPackage(request, packageId),
      onLoad : result => this.store.setDeletePackageSuccess(result.body),
      onError : error => this.store.setDeletePackageError(error)
    });
  }


  /**
   * 
   */
  uploadFile(options) {
    options.url = `${this.baseUrl}/${options.packageId}/updateFile`;
    return new Promise(async (resolve, reject) => {
      
      options.onProgress = (e) => this.store.onFileUploadProgress(options.uploadId, e);

      let file = {
        filename : options.file.name,
        dir : options.dir
      }
      this.store.onFileUploadStart(options.packageId, file);

      try {
        let file = await upload(options);
        this.store.onFileLoaded(options.packageId, file);
        resolve(file);
      } catch(e) {
        this.store.onFileError(options.packageId, file, e);
        reject(e);
      }
    });
  }

  /**
   * 
   * @param {String} packageId 
   * @param {String} file 
   */
  deleteFile(packageId, file) {
    let sep = '';
    if( !file.dir.match(/\/^/) ) sep = '/';
    let filepath = file.dir+sep+encodeURI(file.filename);

    return this.request({
      url : `${this.baseUrl}/${packageId}/file${filepath}`,
      fetchOptions : {
        method : 'DELETE'
      },
      // onLoading : request => this.store.setFileDeleteStart(request, packageId, file),
      onLoad : result => this.store.setFileDeleteSuccess(result.body, packageId, file),
      onError : error => this.store.onFileError(packageId, file, error)
    });
  }

  moveExample(packageId, src, dst) {
    return this.request({
      url : `${this.baseUrl}/${packageId}/example/${src}`,
      fetchOptions : {
        method : 'MOVE',
        body : dst
      }
    });
  }

  deleteExample(packageId, name) {
    return this.request({
      url : `${this.baseUrl}/${packageId}/example/${name}`,
      fetchOptions : {
        method : 'DELETE'
      }
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