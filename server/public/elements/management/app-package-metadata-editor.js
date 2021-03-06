import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-package-metadata-editor.html"

import "@polymer/paper-input/paper-input"
import "@polymer/paper-input/paper-textarea"
import "@polymer/paper-toast/paper-toast"
import "@polymer/paper-tabs/paper-tabs"

import "./app-text-input"
import "./basic/app-create-start"
import "./basic/app-basic-metadata"
import "./details/app-details-metadata"
import "./files/app-files"
import "./releases/app-releases"
import "./dois/app-doi-request"
import "./app-editor-toast"

class AppPackageMetadataEditor extends Mixin(PolymerElement)
      .with(EventInterface) {

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
      },

      fullName : {
        type : String,
        value : ''
      },

      repoType : {
        type : String,
        value : ''
      },

      hasRelease : {
        type : Boolean,
        value : false
      },

      gitHtmlUrl : {
        type : String,
        value : ''
      },

      host : {
        type : String, 
        value : ''
      },

      source : {
        type : String,
        value : ''
      }
    }
  }

  constructor() {
    super();

    this._injectModel('PackageEditor', 'AppStateModel','PackageModel', 'DoiModel');

    this._autoUpdateTimer = -1;
    this.schema = this.PackageModel.schema;
  }

  _onAppStateUpdate(e) {
    if( this.unsavedData ) {
      if( confirm('You have unsaved changes, are you sure you want to leave?') ) {
        this.unsavedData = null;
        this.$.editorToast.hideAll();
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
    setTimeout(() => this.$.tabs.notifyResize(), 100);
  }

  _onPackageEditorDataUpdate(e) {
    this.packageId = e.payload.id || '';
    this.fullName = e.payload.fullName || '';
    this.packageName =  (e.payload.repoOrg ? e.payload.repoOrg+'/' : '')+(e.payload.name || '');
    this.creating = e.state === 'create' ? true : false;
    this.hasRelease = (e.payload.releaseCount && e.payload.releaseCount > 0) ? true : false;
    this.gitHtmlUrl = e.payload.htmlUrl || '';
    this.host = e.payload.host || 'github';
    this.source = e.payload.source;

    if( this.lastState !== e.state || e.reset ) {
      if( e.state === 'create' ) {
        this.selectedSection = 'source';
        this.currentAction = 'Create';
      } else if( e.state === 'edit' ) {
        this.selectedSection = 'basic';
        this.currentAction = 'Update';
        this.$.editorToast.setCommitMessage('');

        // get and set files
        //this.$.files.files = await this._getPackageFiles(pkgData.id);
      }

      this.lastState = e.state;
    }

    if( e.state === 'edit' && this.PackageEditor.hasDataChanged() ) {
      this.$.editorToast.setUnsavedChanges();
    } else {
      this.$.editorToast.hideAll();
    }
  }

  /**
   * @method _fetchAndUpdatePackage
   * @description called when app state updates
   */
  async _fetchAndUpdatePackage(pkgId) {
    this.packageId = pkgId;
    try {
      let e = await this.PackageModel.get(pkgId);
      this.PackageEditor.setEditStartStateData(e.payload);
      this.PackageEditor.setData(e.payload, {state: 'edit', merge: false});

      if( e.payload.source === 'managed' ) {
        this.$.files.files = await this.PackageModel.getFiles(pkgId);
        this.repoType = 'EcoSML Managed Repository';
      } else if( e.payload.source === 'registered' ) {
        this.repoType = 'Registered Repository';
      }

      e = await this.DoiModel.get(pkgId);
      this.PackageEditor.setDoiData(e.payload);
    } catch(e) {
      console.error(e);
      return alert('Failed to fetch package '+pkgId+': '+e.message);
    }
  }

  /**
   * @method _onSaveChangesClicked
   * @description bound to save btn click event
   */
  _onSaveChangesClicked() {
    let unsavedData = Object.assign(
      this.$.basic.getValues(),
      this.$.details.getValues()
    );
    unsavedData.host = this.host;

    this.PackageModel.update(this.packageId, unsavedData, this.$.editorToast.getCommitMessage());
  }

  _onEditPackageUpdate(e) {
    if( e.state === 'loading' ) {
      this.$.editorToast.setChangesSaving();
    } else if( e.state === 'loaded' ) {
      this.unsavedData = null;
      this.$.editorToast.setChangesSaved();
      this.PackageEditor.setEditStartStateData(e.payload);
      this.PackageEditor.setData(e.payload, {state: 'edit', merge: false});
    } else if( e.state === 'error' ) {
      this.$.editorToast.setUnsavedChanges();
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