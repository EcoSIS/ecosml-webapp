const {BaseModel} = require('@ucd-lib/cork-app-utils');
const PackageService = require('../services/PackageService');
const PackageStore = require('../stores/PackageStore');
const PackageSchema = require('../schema').package;

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
   * @param {String} overview short overview description of package 
   * @param {String} organization package organization
   * @param {String} language package programming language
   * @returns {Promise} fetch promise
   */
  async create(name, overview, organization, language, packageType, source) {
    return this.service.create(name, overview, organization, language, packageType, source);
  }

  /**
   * @method get
   * @description get package by id
   * 
   * @param {String} id ecosml id 
   * @returns {Promise} fetch promise
   */
  async get(id) {
    let state = this.store.data.byId[id];

    if( state && state.request ) {
      await state.request;
    } else {
      await this.service.get(id);
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
    try {
      await this.service.update(packageId, data, msg);
    } catch(e) {
      console.error(e);
    }
    
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
  async createRelease(id, releaseInfo) {
    try {
      await this.service.createRelease(id, releaseInfo);
    } catch(e) {}
    return this.store.data.createRelease;
  }

  /**
   * @method getFiles
   * @description get package files
   * 
   * @param {String} packageId
   */
  async getFiles(packageId) {
    let state = this.store.getFiles(packageId);

    if( state && state.request ) {
      await state.request;
    } else {
      await this.service.getFiles(packageId);
    }
    
    return this.store.getFiles(packageId);
  }

  /**
   * @method previewMarkdown
   * @description render markdown with Github flavored markdown service
   * 
   * @param {String} markdown markdown to render
   * 
   * @returns {Promise} resolves to html string
   */
  previewMarkdown(markdown, pkgName) {
    return this.service.previewMarkdown(markdown, pkgName);
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