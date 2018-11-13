import {PolymerElement, html} from "@polymer/polymer"
import "@polymer/paper-input/paper-input"
import "@polymer/paper-input/paper-textarea"
import "@polymer/paper-toast/paper-toast"
import "@polymer/paper-tabs/paper-tabs"

import template from "./app-package-metadata-editor.html"
import PackageInterface from "../interfaces/PackageInterface"
import AppStateInterface from "../interfaces/AppStateInterface"

import "./app-text-input"
import "./basic/app-create-start"
import "./basic/app-basic-metadata"
import "./details/app-details-metadata"
import "./files/app-files"
import "./releases/app-releases"

class AppPackageMetadataEditor extends Mixin(PolymerElement)
      .with(EventInterface, AppStateInterface, PackageInterface) {

  static get template() {
    return html([template]);
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

    this._injectModel('PackageEditor');


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
      // if( this.packageId === e.location.path[1] ) return;
      this.packageId = e.location.path[1];
      this._fetchAndUpdatePackage( e.location.path[1] );
    } else if( page === 'create' ) {
      this.PackageEditor.reset();
    }

    setTimeout(() => this.$.tabs.notifyResize(), 25);
  }

  _onPackageEditorDataUpdate(e) {
    this.packageId = e.payload.id || '';
    this.packageName = e.payload.name || '';
    this.creating = e.state === 'create' ? true : false;

    if( this.lastState !== e.state ) {
      if( e.state === 'create' ) {
        this.selectedSection = 'source';
        this.currentAction = 'Create';
      } else if( e.state === 'edit' ) {
        this.selectedSection = 'basic';
        this.currentAction = 'Update';
        this.$.commitMsg.value = '';

        // get and set files
        //this.$.files.files = await this._getPackageFiles(pkgData.id);

        // set release info
        // this.$.release.package = pkgData;
        // this.$.release.releases = (pkgData.releases || []);
      }

      this.lastState = e.state;
    }
  }

  /**
   * @method _fetchAndUpdatePackage
   * @description called when app state updates
   */
  async _fetchAndUpdatePackage(pkgId) {
    this.packageId = pkgId;
    try {
      let e = await this._getPackage(pkgId);
      this.PackageEditor.setEditStartStateData(e.payload);
      this.PackageEditor.setData(e.payload, {state: 'edit'});
    } catch(e) {
      return alert('Failed to fetch package '+pkgId+': '+e.message);
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
      tmp[key] = this.data[key] || (key === 'keywords' ? [] : '');
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
    let unsavedData = Object.assign(
      this.$.basic.getValues(),
      this.$.details.getValues()
    );

    this._updatePackage(this.packageId, unsavedData, this.$.commitMsg.value);
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

  /**
   * @method _onCreateStartNextTab
   * @description bound to app-create-start next-tab event.  Called when the
   * tab should be set to 'basic'.
   */
  _onCreateStartNextTab() {
    this.selectedSection = 'basic';
  }

  _valueToArray(value) {
    return value.split(',').map(value => value.trim());
  }

}
customElements.define('app-package-metadata-editor', AppPackageMetadataEditor);