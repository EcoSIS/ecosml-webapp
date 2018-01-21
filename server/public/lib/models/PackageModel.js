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
   * @param {String} description short description of package 
   * @returns {Promise} fetch promise
   */
  async create(name, description) {
    return this.service.create(name, description);
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
   * @returns {Promise} fetch promise
   */
  async update(data) {
    await this.service.update(data);
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
    this.service.createRelease(id, releaseInfo);

  }

}

module.exports = new PackageModel();