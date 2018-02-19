import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import "@polymer/paper-input/paper-input"
import "@polymer/paper-input/paper-textarea"
import "@polymer/paper-toast/paper-toast"
import "@polymer/paper-tabs/paper-tabs"

import template from "./app-package-metadata-editor.html"
import PackageInterface from "../interfaces/PackageInterface"
import AppStateInterface from "../interfaces/AppStateInterface"

import "./app-text-input"
import "./basic/app-basic-metadata"
import "./details/app-details-metadata"
import "./files/app-files"
import "./releases/app-releases"

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


      selectedSection : {
        type : String,
        value : 'basic'
        // value : 'files'
      },

      // package schema object
      schema : {
        type : Object,
        value : {}
      },

      // used for displaying package name
      name : {
        type : String,
        value : ''
      }

    }
  }

  constructor() {
    super();
    this.active = true;
    this._autoUpdateTimer = -1;
    this.schema = this._getPackageSchema();
  }

  _onAppStateUpdate(e) {
    if( this.unsavedData ) {
      if( confirm('You have unsaved changes, are you sure you want to leave?') ) {
        this.unsavedData = null;
        this.$.savingToast.close();
      } else {
        this._setWindowLocation('/edit/'+this.packageId);
        return;
      }
    }
    
    let page = e.location.path[0];

    if( page === 'edit' && e.location.path.length > 0 ) {
      if( this.packageId === e.location.path[1] ) return;
      this.packageId = e.location.path[1];
      this._fetchAndUpdatePackage( e.location.path[1] );
    } else if( page === 'create' ) {
      this.createPackage();
    }

    setTimeout(() => this.$.tabs.notifyResize(), 25);
  }

  /**
   * @method createPackage
   * @description Reset UI to create a new package
   */
  createPackage() {
    this.currentAction = 'Create';
    this.creating = true;
    this.selectedSection = 'basic';
    this.name = '';
    this.packageId = '';
    this.$.basic.reset();
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

  /**
   * @method _fetchAndUpdatePackage
   * @description called when app state updates
   */
  async _fetchAndUpdatePackage(pkgId) {
    try {
      let pkg = await this._getPackage(pkgId);
      this._setPackageData(pkg.payload);
    } catch(e) {
      console.error(e);
      return alert('Failed to fetch package '+pkgId+': '+e.message);
    }
  }

  /**
   * @method _onPackageUpdate
   * @description via package interface, called when package data updates
   */
  _setPackageData(e) {
    if( e.state !== 'loaded' ) return;
    if( e.id !== this.packageId ) return;
    this._setPackageData(e.payload);
  }

  /**
   * @method _setPackageData
   * @description update UI from package data
   * 
   * @param {Object} pkgData package to render
   */
  async _setPackageData(pkgData) {
    this.currentAction = 'Update';
    this.creating = false;
    this.$.commitMsg.value = '';
    this.packageId = pkgData.id;
    this.name = pkgData.name;
    this.data = pkgData;

    // set basic metadata inputs
    this.$.basic.data = pkgData;
    this.$.details.data = pkgData;

    // get and set files
    this.$.files.files = await this._getPackageFiles(pkgData.id);

    // set release info
    this.$.release.package = pkgData;
    if( pkgData.releases && pkgData.releases.length ) {
      let cRelease = pkgData.releases[pkgData.releases.length-1].name;
      this.$.release.releases = pkgData.releases;
      this.$.release.currentRelease = cRelease;
    } else {
      this.$.release.releases = [];
      this.$.release.currentRelease = null;
    }
  }

  /**
   * @method _onDataChange
   * @description Fired when input elements update
   */  
  _onDataChange() {
    if( this.creating ) return;

    let unsavedData = Object.assign(
      this.$.basic.getValues(),
      this.$.details.getValues()
    );

    let tmp = {};
    for( var key in unsavedData ) {
      tmp[key] = this.data[key] || '';
    }

    if( JSON.stringify(tmp) === JSON.stringify(unsavedData) ) {
      this.$.savingToast.close();
      return;
    }

    this.$.unsavedMsg.style.display = 'block';
    this.$.savingMsg.style.display = 'none';
    this.$.savingToast.open();
  }

  _onSaveChangesClicked() {
    this._updatePackage(this.packageId, this.unsavedData, this.$.commitMsg.value);
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
      alert('Failed to save package data :( '+e.error.message);
    }
  }

  _valueToArray(value) {
    return value.split(',').map(value => value.trim());
  }

}
customElements.define('app-package-metadata-editor', AppPackageMetadataEditor);