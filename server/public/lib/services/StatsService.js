const {BaseService} = require('@ucd-lib/cork-app-utils');
const StatsStore = require('../stores/StatsStore');

class StatsService extends BaseService {

  constructor() {
    super();
    this.store = StatsStore;
    this.baseUrl = '/api/stats';
  }

  get() {
    return this.request({
      url : this.baseUrl,
      checkCached: () => this.store.data ? true : false,
      onLoading: request => this.store.setLoading(request),
      onLoad: response => this.store.setLoaded(response.body),
      onError: error => this.store.setError(error)
    });
  }

}

module.exports = new StatsService();