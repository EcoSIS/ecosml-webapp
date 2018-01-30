import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import "@polymer/paper-input/paper-input"
import "@polymer/paper-input/paper-textarea"
import "@polymer/paper-toast/paper-toast"
import "@polymer/paper-tabs/paper-tabs"

import template from "./app-package-metadata-editor.html"
import PackageInterface from "../interfaces/PackageInterface"
import AppStateInterface from "../interfaces/AppStateInterface"
import "./app-markdown-editor"
import "./app-keyword-input"
import "./app-theme-input"
import "./app-create-release"
import "./app-text-input"
import "./app-org-input"

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

      selectedSection : {
        type : String,
        value : 'basicInformation'
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
      this.fetchAndUpdatePackage( e.location.path[1] );
    } else if( page === 'create' ) {
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
    this.selectedSection = 'basicInformation';
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
    if( !this.get('organization') ) {
      return alert('Please select an organization');
    }

    this._createPackage(
      this.namePreview, 
      this.get('overview'),
      this.get('organization')
    );
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
    let dataWrapper;
    try {
      dataWrapper = await this._getPackage(pkgId);
    } catch(e) {
      return alert('Failed to fetch package with id: '+pkgId);
    }
    this.updatePackage(dataWrapper.payload);
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
    this.$.commitMsg.value = '';

    this.namePreview = pkgData.name;

    let schema = this._getPackageSchema();
    for( var key in schema ) {
      if( pkgData[key] ) this.set(key, pkgData[key]);
      else this.set(key);
    }

    if( pkgData.releases && pkgData.releases.length ) {
      let cRelease = pkgData.releases[pkgData.releases.length-1].name;
      this.$.release.release = cRelease;
      this.$.release.currentRelease = cRelease;
    }

    this.$.organization.value = pkgData.organization;

    this.$.theme.setValues(pkgData);
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

    this._setWindowLocation('/edit/'+e.payload.id);
  }

  /**
   * @method _onDataChange
   * @description Fired when input elements update
   */  
  _onDataChange() {
    if( this.creating ) return;

    this.unsavedData = {
      name : this.namePreview,
      overview : this.get('overview'),
      description : this.get('description'),
      keywords : this.get('keywords'),
      organization : this.get('organization')
    }

    this.$.unsavedMsg.style.display = 'block';
    this.$.savingMsg.style.display = 'none';
    this.$.savingToast.open();
  }

  /**
   * @method _onThemeUpdate
   * @description called from the app-theme-input when a value updates
   */
  _onThemeUpdate(e) {
    this._onDataChange();
    for( var key in e.detail ) {
      this.unsavedData[key] = e.detail[key];
    }
  }

  _onSaveChangesClicked() {
    this._updatePackage(this.unsavedData, this.$.commitMsg.value);
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