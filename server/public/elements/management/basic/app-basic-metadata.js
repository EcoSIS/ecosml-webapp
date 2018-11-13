import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-basic-metadata.html"

import "./app-org-input"
import "./app-created-popup"
import PackageInterface from "../../interfaces/PackageInterface"
import AppStateInterface from "../../interfaces/AppStateInterface"

const VALUES = ['name', 'overview', 'organization', 'language', 'packageType'];

export default class AppBasicMetadata extends Mixin(PolymerElement)
  .with(EventInterface, AppStateInterface, PackageInterface) {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      isManagedSource : {
        type : Boolean,
        value : false
      },

      creating : {
        type : Boolean,
        value : false
      },

      deleting : {
        type : Boolean,
        value : false
      },

      ecosisHost : {
        type : String,
        value : APP_CONFIG.ecosisDataHost
      },

      hasRelease : {
        type : Boolean,
        value : false
      }
    }
  }

  constructor() {
    super();
    this.active = true;

    this._injectModel('PackageEditor');
  }

  get name() {
    // safety check, only applies to name...
    if( !this.$ ) return '';

    if( this.editorData && this.editorData.source === 'registered') {
      return this.$.url.value || '';
    }
    return this.$.name.value || '';
  }

  set name(value) {
    if( this.editorData && this.editorData.source === 'registered') {
      this.$.url.value || '';
    }
    this.$.name.value = value || '';
  }

  get overview() {
    return this.$.overview.value;
  }

  set overview(value) {
    this.$.overview.value = value || '';
  }

  get language() {
    return this.$.language.value;
  }

  set language(value) {
    this.$.language.value = value || '';
  }

  get packageType() {
    if( this.$.packageInput.checked ) return 'package';
    else return 'standalone';
  }

  set packageType(value) {
    this.$.packageInput.removeAttribute('checked');
    this.$.standaloneInput.removeAttribute('checked');

    if( value === 'package' ) this.$.packageInput.setAttribute('checked', 'checked');
    else this.$.standaloneInput.setAttribute('checked', 'checked');
  }

  get organization() {
    return this.$.organization.value;
  }

  set organization(value) {
    this.$.organization.value = value || '';
  }

  get keywords() {
    return this.$.keywords.value;
  }

  set keywords(value) {
    this.$.keywords.value = value || '';
  }

  ready() {
    super.ready();
    this._checkNameAvailableTimer = -1;
  }

  _onPackageEditorDataUpdate(e) {
    this.packageId = e.payload.id || '';
    this.packageName = e.payload.name || '';

    // always needs to be set before loop below so
    // name setter knows to set URL or NAME input
    this.editorData = e.payload;

    for( let value of VALUES ) {
      this[value] = e.payload[value];
    }

    console.log(e.payload);

    this.isManagedSource = (e.payload.source === 'registered') ? false : true;
    this.creating = e.state === 'create' ? true : false;
    this.hasRelease = (e.payload.releaseCount && e.payload.releaseCount > 0) ? true : false;
  }

  /**
   * @method getValues
   * @description return an object with all current values controlled by
   * the basic metadata inputs.
   * 
   * @returns {Object}
   */
  getValues() {
    let data = {};
    VALUES.forEach(value => {
      data[value] = this[value];
    });
    return data;
  }

  /**
   * @method _updateNamePreview
   * @description Fired from name input
   */
  _updateNamePreview() {
    this.name = this._getCleanName();
    this._onInputChange();
  }

  _getCleanName() {
    return this.$.name.value.toLowerCase().replace(/ /g, '-').replace(/[^a-zA-Z0-9_-]/g, '');
  }

  _onNameInputKeyUp() {
    this._checkNameAvailable();
  }

  _checkNameAvailable() {
    this.$.nameMessage.innerHTML = this._getCleanName()+': Checking...';
    this.$.nameMessage.className = '';

    if( this._checkNameAvailableTimer !== -1 ) {
      clearTimeout(this._checkNameAvailableTimer);
    }

    this._checkNameAvailableTimer = setTimeout(async () => {
      this._checkNameAvailableTimer = -1;

      let name = this._getCleanName();
      if( !name ) {
        this.$.nameMessage.innerHTML = '';
        return;
      }

      this.nameAvailable = await this.PackageEditor.isNameAvailable(name);
      
      if( this.nameAvailable ) {
        this.$.nameMessage.innerHTML = this._getCleanName()+': Available';
        this.$.nameMessage.className = 'ok';
      } else {
        this.$.nameMessage.innerHTML = this._getCleanName()+': Unavailable';
        this.$.nameMessage.className = 'error';
      }
    }, 300);
  }

  /**
   * @method _onInputChange
   * @description called when any input changes
   */
  _onInputChange() {
    this.PackageEditor.setData(this.getValues());
  }

  /**
   * @method _onCreateBtnClicked
   * @description function fired when the create button is clicked
   */
  async _onCreateBtnClicked() {
    let data = this.PackageEditor.getData();

    if( !this.nameAvailable ) {
      return alert('Name is not available');
    }
    if( (data.name || '').length < 4 ) {
      return alert('Name must be at least 4 characters');
    }
    if( (data.overview || '').length < 15 ) {
      return alert('Please provide a longer overview');
    }
    if( !data.organization) {
      return alert('Please select an organization');
    }
    if( !data.packageType ) {
      return alert('Please select a package type');
    }

    try {
      await this._createPackage(data.name, data.overview, data.organization, data.language, data.packageType);
      this.$.created.open();
    } catch(e) {
      alert('Failed to create package: '+e.message);
    }
  }

  /**
   * @method _onDeleteBtnClicked
   * @description function fired when the delete button is clicked
   */
  async _onDeleteBtnClicked() {
    if( !confirm('Are you sure you want to delete package '+this.packageName+' and all it\s contents?') ) return;
    if( !confirm('Are you really sure you want to delete '+this.packageName+'?') ) return;

    this.deleting = true;
    await this._deletePackage(this.packageId); 
    this.deleting = false;

    window.location = '/account';
    // window.location.reload();
  }

  /**
   * @method _onCreatePackageUpdate
   * @description via PackageInterface, Fired when create package state updates
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

}

customElements.define('app-basic-metadata', AppBasicMetadata);