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

    this.EventBus.on('app-state-update', e => {
      if( e.page === 'package' ) {
        if( e.location.path.length === 4 ) {
          this.get(e.location.path.slice(1, 4).join('/'));
        } else {
          this.get(e.location.path[1]);
        }
      }
    });
      
    this.register('PackageModel');
  }

  /**
   * @method create
   * @description create package
   * 
   * @param {String} name name of new package
   * @param {String} host
   * @param {String} overview short overview description of package 
   * @param {String} organization package organization
   * @param {String} language package programming language
   * @returns {Promise} fetch promise
   */
  async create(pkg) {
    pkg = {
      name : pkg.name, 
      repoOrg : pkg.repoOrg,
      host: pkg.host, 
      overview: pkg.overview, 
      organization: pkg.organization, 
      language: pkg.language, 
      packageType: pkg.packageType, 
      source: pkg.source
    }
    return this.service.create(name, host, overview, organization, language, packageType, source);
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
  async previewMarkdown(markdown, pkgName) {
    let state = this.store.data.markdown[pkgName] || {};

    if( state.state === 'loading' ) {
      await state.request;
    } else {
      await this.service.previewMarkdown(markdown, pkgName);
    }
    // } else if( state.state !== 'loaded' ) {
    //   await this.service.previewMarkdown(markdown, pkgName);
    // }

    return this.store.data.markdown[pkgName];
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