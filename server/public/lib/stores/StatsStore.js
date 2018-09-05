const {BaseStore} = require('@ucd-lib/cork-app-utils');

class StatsStore extends BaseStore {

  constructor() {
    super();

    this.data = null;
    this.events = {
      'STATS_UPDATE' : 'stats-update'
    }
  }

  setLoading(request) {
    this._set({
      state: this.STATE.LOADING,
      request
    });
  }

  setLoaded(stats) {
    this._set({
      state: this.STATE.LOADED,
      payload : stats
    });
  }

  setError(error) {
    this._set({
      state: this.STATE.ERROR,
      error
    });
  }

  _set(state) {
    this.data = state;
    this.emit(this.events.STATS_UPDATE, state);
  }

}

module.exports = new StatsStore();