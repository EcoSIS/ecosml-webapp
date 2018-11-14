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
   * @method isNameAvailable
   * @description is package name available
   * 
   * @param {String} packageName
   * 
   * @returns {Promise} resolves to Boolean
   */
  async isNameAvailable(packageName) {
    try {
      let {body} = await this.service.isNameAvailable(packageName);
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