const {BaseStore} = require('@ucd-lib/cork-app-utils');
const clone = require('clone');

const IGNORE_DATA_PROPERTIES = {
  managed : [],
  registered : ['description', 'overview', 'releases', 'releaseCount']
}

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
      reset : true,
      payload : {}
    });
  }

  /**
   * @method setEditStartStateData
   * 
   * @param {*} data 
   */
  setEditStartStateData(data) {
    this.data.startState = clone(data);
    this.setData()
  }

  /**
   * @method hasDataChanged
   * @description is there any difference between
   * data.package.payload and startState
   * 
   * @returns {Boolean}
   */
  hasDataChanged() {
    let states = [this.data.package.payload, this.data.startState]
      .map(state => {
        state = clone(state);
        let ignore = IGNORE_DATA_PROPERTIES[state.source] || [];

        for( let key in state ) {
          if( Array.isArray(state[key]) && state[key].length === 0) {
            delete state[key];
          } else if ( state[key] === '' ) {
            delete state[key];
          } else if( ignore.indexOf(key) > -1 ) {
            delete state[key];
          }
        }
        return state;
      });

    return this.stateChanged(states[0], states[1]);
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
      newState.payload = Object.assign({}, this.data.package.payload, data);
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