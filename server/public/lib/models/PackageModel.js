const {BaseModel} = require('@ucd-lib/cork-app-utils');
const PackageService = require('../services/PackageService');
const PackageStore = require('../stores/PackageStore');
const PackageSchema = require('../schema').package;
const uuid = require('uuid');

class PackageModel extends BaseModel {

  constructor() {
    super();

    this.schema = PackageSchema;

    this.store = PackageStore;
    this.service = PackageService;
      
    this.register('PackageModel');
  }

  /**
   * @method create
   * @description create package
   * 
   * @param {String} name name of new package
   * @param {String} description short description of package 
   * @param {String} organization package organization
   * @returns {Promise} fetch promise
   */
  async create(name, description, organization) {
    return this.service.create(name, description, organization);
  }

  /**
   * @method get
   * @description get package by id
   * 
   * @param {String} id ecosml id 
   * @returns {Promise} fetch promise
   */
  async get(id) {
    this.service.get(id);

    if( this.store.data.byId[id].state === this.store.STATE.LOADING ) {
      await this.store.data.byId[id].request;
    }
    
    return this.store.data.byId[id];
  }

  /**
   * @method update
   * @description update package
   * 
   * @param {Object} data data to update package with
   * @param {String} msg commit message
   * @returns {Promise} fetch promise
   */
  async update(packageId, data, msg) {
    await this.service.update(packageId, data, msg);
    return this.store.data.update;
  }

  /**
   * @method delete
   * @description delete package
   * 
   * @param {String} name name of package to delete
   * @returns {Promise} fetch promise
   */
  async delete(name) {
    return this.service.delete(name);
  }

  /**
   * @method createRelease
   * @description create a package release
   * 
   * @param {String} id id of package to create release for
   * @param {Object} releaseInfo
   * @param {String} releaseInfo.name tag name for release
   * @param {String} releaseInfo.description
   * 
   * @returns {Promise} fetch promise
   */
  createRelease(id, releaseInfo) {
    return this.service.createRelease(id, releaseInfo);
  }

  /**
   * @method uploadFile
   * @description add a file to a repository
   * 
   * @param {Object} options
   * @param {String} options.packageId id of package to add file
   * @param {Object} options.file reference to file from form element
   * @param {String} options.dir path to place file in repo
   * @param {String} options.message message for commit
   * 
   * @returns {Promise}
   */
  uploadFile(options) {
    options.uploadId = uuid.v4();
    options.dir = options.dir || '/';
    return this.service.uploadFile(options);
  }

  /**
   * @method cancelFileUpload
   * @description cancel a file upload.  Options should be the same object
   * passed to the uploadFile method.  The actual xhr element will have been
   * attached and will be aborted
   * 
   * @param {Object} options 
   */
  cancelFileUpload(options) {
    if( !options.xhr ) throw new Error('Upload object has no xhr to cancel');
    options.xhr.abort();
    
    let file = {
      filename : options.file.filename,
      dir : options.dir
    }
    this.store.setFileUploadCancelled(options.packageId, file);
  }

  /**
   * @method deleteFile
   * @description delete a file
   * 
   * @param {String} packageId id of package
   * @param {String} file file object
   * 
   * @returns {Promise}
   */
  deleteFile(packageId, file) {
    return this.service.deleteFile(packageId, file);
  }

  /**
   * @method getFiles
   * @description get package files
   * 
   * @param {String} packageId
   */
  async getFiles(packageId) {
    await this.service.getFiles(packageId);
    return this.store.getFiles(packageId);
  }

  /**
   * @method moveExample
   * @description move (rename) example directory
   * 
   * @param {String} packageId
   * @param {String} src current example directory name
   * @param {String} dst new example directory name
   * 
   * @returns {Promise}
   */
  async moveExample(packageId, src, dst) {
    await this.service.moveExample(packageId, src, dst);
    return this.getFiles(pacakgeId);
  }

  /**
   * @method deleteExample
   * @description delete example directory
   * 
   * @param {String} packageId
   * @param {String} name example directory to delete
   * 
   * @returns {Promise}
   */
  async deleteExample(packageId, name) {
    await this.service.deleteExample(packageId, name);
    return this.getFiles(pacakgeId);
  }

  /**
   * @method previewMarkdown
   * @description render markdown with Github flavored markdown service
   * 
   * @param {String} markdown markdown to render
   * 
   * @returns {Promise} resolves to html string
   */
  previewMarkdown(markdown) {
    return this.service.previewMarkdown(markdown);
  }

  /**
   * @method setSelectedPackageId
   * @description set the curretly selected package
   */
  setSelectedPackageId(packageId) {
    this.store.setSelectedPackageId(packageId);
  }

  /**
   * @method getSelectedPackageId
   * @description get the currently select packages
   */
  getSelectedPackageId(packageId) {
    return this.store.getSelectedPackageId(packageId);
  }

}

module.exports = new PackageModel();