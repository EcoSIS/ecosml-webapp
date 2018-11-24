const {BaseModel} = require('@ucd-lib/cork-app-utils');
const PackageEditorService = require('../services/PackageEditorService');
const PackageEditorStore = require('../stores/PackageEditorStore');

class PackageEditor extends BaseModel {

  constructor() {
    super();

    this.store = PackageEditorStore;
    this.service = PackageEditorService;
      
    this.register('PackageEditor');
  }

  /**
   * @method syncRegProps
   * @description sync a registered repositories properties from remote
   * github repo.
   * 
   * @param {String} packageId 
   * 
   * @returns {Promise}
   */
  syncRegProps(packageId) {
    return this.service.syncRegProps(packageId);
  }

  /**
   * @method isNameAvailable
   * @description is package name available
   * 
   * @param {String} packageName
   * @param {String} organization Optional.  defaults to EcoSML
   * 
   * @returns {Promise} resolves to Boolean
   */
  async isNameAvailable(packageName, organization) {
    try {
      let {body} = await this.service.isNameAvailable(packageName, organization);
      return body.isAvailable;
    } catch(e) {
      console.error(e);
    }

    return false // ?
  }

  /**
   * @method setData
   * @description update the package data editor state
   * 
   * @param {Object} data 
   * @param {Object} opts
   * @param {Boolean} opts.merge
   * @param {String} opts.state
   */
  setData(data, opts={}) {
    console.log(data);
    this.store.setData(data, opts);
  }

  setEditStartStateData(data) {
    this.store.setEditStartStateData(data);
  }

  hasDataChanged() {
    return this.store.hasDataChanged();
  }

  getData() {
    return this.store.data.package.payload;
  }

  reset() {
    this.store.reset();
  }

}

module.exports = new PackageEditor();