import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import "@polymer/paper-input/paper-input"

import template from "./app-repo-metadata-editor.html"
import RepoInterface from "../interfaces/RepoInterface"
import AppStateInterface from "../interfaces/AppStateInterface"

class AppRepoMetadataEditor extends Mixin(PolymerElement)
      .with(EventInterface, AppStateInterface, RepoInterface) {

  static get template() {
    return template;
  }

  static get properties() {
    return {
      creating : {
        type : Boolean,
        value : true
      },
      currentAction : {
        type : String,
        value : 'Create'
      },
      sections : {
        type : Array,
        value : () => ['basicInformation', 'details']
      },

      // repo schema object
      schema : {
        type : Object,
        value : {}
      },

      // used for displaying package name
      namePreview : {
        type : String,
        value : ''
      }
    }
  }

  constructor() {
    super();
    this.schema = this._getRepoSchema();
  }

  onAppStateUpdate(e) {
    if( e.location.path[0] !== 'package' ) return;
    if( e.location.path.length > 1 ) {
      this.fetchAndUpdatePackage( e.location.path[1] );
    } else {
      this.createPackage();
    }
  }

  get(attr) {
    switch(attr) {
      case 'keywords':
        return this._valueToArray(this.$.keywords.value)
                   .map(value => value.toLowerCase());
      default:
        return this.$[attr].value;
    }
  }

  set(attr, value) {
    switch(attr) {
      case 'keywords':
        return this.$.keywords.value = value ? value.join(', ') : '';
      default:
        return this.$[attr].value = value || '';
    }
  }

  /**
   * @method createPackage
   * @description Reset UI to create a new package
   */
  createPackage() {
    this.currentAction = 'Create';
    this.creating = true;
    this.namePreview = '';
    for( var key in schema ) this.set(key);
  }

  /**
   * @method _onCreateBtnClicked
   * @description function fired when the create button is clicked
   */
  _onCreateBtnClicked() {
    if( this.namePreview.length < 4 ) {
      return alert('Name must be at least 4 characters');
    }
    if( this.get('overview').length < 15 ) {
      return alert('Please provide a longer overview');
    }

    this._createRepo(this.namePreview, this.get('overview'));
  }

  async fetchAndUpdatePackage(pkgId) {
    let repo;
    try {
      repo = await this._getRepo(pkgId);
    } catch(e) {
      return alert('Failed to fetch package with id: '+pkgId);
    }
    this.updatePackage(repo);
  }

  /**
   * @method updatePackage
   * @description update UI from package data
   * 
   * @param {Object} pkgData package to render
   */
  updatePackage(pkgData) {
    this.currentAction = 'Update';
    this.creating = false;

    this.namePreview = pkgData.name;

    let schema = this._getRepoSchema();
    for( var key in schema ) {
      if( pkgData[key] ) this.set(key, pkgData[key]);
      else this.set(key);
    }
  }

  /**
   * Fired from name input
   */
  _updateNamePreview() {
    this.namePreview = this.get('name').toLowerCase().replace(/ /g, '-');
  }

  _onCreateRepoUpdate(e) {
    if( e.state === 'loaded' ) {

    }
    console.log(e);
  }

  _valueToArray(value) {
    return value.split(',').map(value => value.trim());
  }


}
customElements.define('app-repo-metadata-editor', AppRepoMetadataEditor);