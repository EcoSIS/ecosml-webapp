import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import "@polymer/paper-input/paper-input"
import "@polymer/paper-input/paper-textarea"
import "@polymer/paper-toast/paper-toast"

import template from "./app-package-metadata-editor.html"
import PackageInterface from "../interfaces/PackageInterface"
import AppStateInterface from "../interfaces/AppStateInterface"
import "./app-markdown-editor"
import "./app-keyword-input"


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
    this._autoUpdateTimer = -1;
    this.schema = this._getPackageSchema();
  }

  _onAppStateUpdate(e) {
    if( this.unsavedData ) {
      if( confirm('You have unsaved changes, are you sure you want to leave?') ) {
        this.unsavedData = null;
        this.$.savingToast.close();
      } else {
        this._setWindowLocation('/package/'+this.packageId);
        return;
      }
    }
    
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
    return this.$[attr].value;
  }

  set(attr, value) {
    this.$[attr].value = value || '';
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

  /**
   * Fired when input elements update
   */  
  _onDataChange() {
    if( this.creating ) return;

    this.unsavedData = {
      name : this.namePreview,
      overview : this.get('overview'),
      description : this.get('description'),
      keywords : this.get('keywords')
    }

    this.$.unsavedMsg.style.display = 'block';
    this.$.savingMsg.style.display = 'none';
    this.$.savingToast.open();
  }

  _onSaveChangesClicked() {
    this._updatePackage(this.unsavedData);
  }

  _onEditPackageUpdate(e) {
    if( e.state === 'loading' ) {
      this.$.unsavedMsg.style.display = 'none';
      this.$.savingMsg.style.display = 'block';
    } else if( e.state === 'loaded' ) {
      this.unsavedData = null;
      this.$.savingToast.close();
      this.$.savedToast.open();
    } else if( e.state === 'error' ) {
      this.$.unsavedMsg.style.display = 'block';
      this.$.savingMsg.style.display = 'none';
      alert('Failed to save package data :( '+e.payload.message);
    }
  }

  _valueToArray(value) {
    return value.split(',').map(value => value.trim());
  }


}
customElements.define('app-package-metadata-editor', AppPackageMetadataEditor);