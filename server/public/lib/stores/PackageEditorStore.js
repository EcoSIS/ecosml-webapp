const {BaseStore} = require('@ucd-lib/cork-app-utils');
const clone = require('clone');

class PackageEditorStore extends BaseStore {

  constructor() {
    super();

    this.ignoreFiles = [];

    this.data = {
      package : {
        payload : {},
        state : ''
      },
      startState : {}
    }

    this.events = {
      PACKAGE_EDITOR_DATA_UPDATE : 'package-editor-data-update'
    }
  }

  reset() {
    this._setData({
      state : 'create',
      payload : {}
    });
  }

  setEditStartStateData(data) {
    this.data.startState = clone(data);
  }

  /**
   * @method setData
   * 
   * @param {Object} data 
   * @param {Object} opts
   * @param {Boolean} opts.merge
   * @param {String} opts.state
   *  
   */
  setData(data, opts={}) {
    if( opts.merge === undefined ) opts.merge = true;

    let newState = {
      state : this.data.package.state,
      payload : null
    }

    if( opts.merge ) {
      newState.payload = Object.assign({}, this.data.package.state.payload, data);
    } else {
      newState.payload = data;
    }

    if( opts.state ) {
      newState.state = opts.state;
    }

    this._setData(newState);
  }

  _setData(newState) {
    if( !this.stateChanged(this.data.package, newState) ) {
      return;
    }
    this.data.package = newState;

    this.emit(this.events.PACKAGE_EDITOR_DATA_UPDATE, this.data.package);
  }

}

module.exports = new PackageEditorStore();