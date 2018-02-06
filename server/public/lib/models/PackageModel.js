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
  async update(data, msg) {
    await this.service.update(data, msg);
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
   * @param {String} options.repoName name of repository to add file to
   * @param {Object} file reference to file from form element
   * @param {String} filename
   * @param {String} filePath path to place file in repo
   * @param {String} message message for commit
   * 
   * @returns {Promis}
   */
  uploadFile(options) {
    options.id = uuid.v4();
    return this.service.uploadFile(options);
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



}

module.exports = new PackageModel();