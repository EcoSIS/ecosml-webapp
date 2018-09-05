const {BaseModel} = require('@ucd-lib/cork-app-utils');
const StatsService = require('../services/StatsService');
const StatsStore = require('../stores/StatsStore');

class StatsModel extends BaseModel {

  constructor() {
    super();

    this.store = StatsStore;
    this.service = StatsService;
      
    this.register('StatsModel');
  }

  async get() {
    await this.service.get();
    return this.store.data;
  }

}

module.exports = new StatsModel();