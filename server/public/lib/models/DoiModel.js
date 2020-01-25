const {BaseModel} = require('@ucd-lib/cork-app-utils');
const DoiService = require('../services/DoiService');
const DoiStore = require('../stores/DoiStore');

class DoiModel extends BaseModel {

  constructor() {
    super();

    this.store = DoiStore;
    this.service = DoiService;
      
    this.register('DoiModel');
  }

  /**
   * @method get
   * 
   * @param {String} id package id 
   */
  get(id) {
    this.service.get(id);
  }

  
}

module.exports = DoiModel;