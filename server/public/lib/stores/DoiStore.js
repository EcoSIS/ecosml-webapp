const {BaseStore} = require('@ucd-lib/cork-app-utils');

class DoiStore extends BaseStore {

  constructor() {
    super();

    this.data = {};
    this.events = {}
  }
}

module.exports = new DoiStore();