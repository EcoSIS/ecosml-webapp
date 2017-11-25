import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import "@polymer/paper-input/paper-input"
import "@polymer/paper-input/paper-textarea"

import template from "./app-package-metadata-editor.html"
import PackageInterface from "../interfaces/PackageInterface"
import AppStateInterface from "../interfaces/AppStateInterface"
import "./app-markdown-editor"


class AppPackageMetadataEditor extends Mixin(PolymerElement)
      .with(EventInterface, AppStateInterface, PackageInterface) {

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

      // package schema object
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
    this.schema = this._getPackageSchema();
  }

  _onAppStateUpdate(e) {
    if( e.location.path[0] !== 'package' ) return;
    if( e.location.path.length > 1 ) {
      if( this.packageId === e.location.path[1] ) return;
      this.packageId = e.location.path[1];
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
    for( var key in this.schema ) this.set(key);
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

    this._createPackage(this.namePreview, this.get('overview'));
  }

  /**
   * @method _onDeleteBtnClicked
   * @description function fired when the delete button is clicked
   */
  _onDeleteBtnClicked() {
    if( !confirm('Are you sure you want to delete this package and all it\s contents?') ) return;
    if( !confirm('Are you really sure?') ) return;
    this._deletePackage(this.packageId); 
  }

  async fetchAndUpdatePackage(pkgId) {
    let result;
    try {
      result = await this._getPackage(pkgId);
    } catch(e) {
      return alert('Failed to fetch package with id: '+pkgId);
    }
    this.updatePackage(result.body);
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

    let schema = this._getPackageSchema();
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

  /**
   * Fired when create package state updates
   */
  _onCreatePackageUpdate(e) {
    if( e.state === 'loading' ) {
      this.$.createBtn.setAttribute('disabled', 'disabled');
      this.$.createBtn.innerHTML = 'Creating...';
      return;
    }

    this.$.createBtn.removeAttribute('disabled', 'disabled');
    this.$.createBtn.innerHTML = 'Create';
    if( e.state === 'error' ) {
      return alert('Failed to create package :( '+e.error.message);
    }

    this._setWindowLocation('/package/'+e.payload.id);
  }

  _valueToArray(value) {
    return value.split(',').map(value => value.trim());
  }


}
customElements.define('app-package-metadata-editor', AppPackageMetadataEditor);