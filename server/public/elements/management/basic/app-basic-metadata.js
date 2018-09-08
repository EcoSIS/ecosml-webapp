import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-basic-metadata.html"

import "./app-org-input"
import "./app-created-popup"
import PackageInterface from "../../interfaces/PackageInterface"
import AppStateInterface from "../../interfaces/AppStateInterface"

const VALUES = ['name', 'overview', 'organization', 'language'];

export default class AppBasicMetadata extends Mixin(PolymerElement)
  .with(EventInterface, AppStateInterface, PackageInterface) {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      data : {
        type : Object,
        value : () => {},
        observer : '_onDataUpdate'
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
  }

  get name() {
    return this.$ ? this.$.name.value : '';
  }

  set name(value) {
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
  }

  /**
   * @method reset
   * @description clear all inputs
   */
  reset() {
    this.name = '';
    this.overview = '';
    this.organization = '';
    this.language = '';
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
   * @method _onDataUpdate
   * @description called when data property updates
   */
  _onDataUpdate() {
    if( !this.data ) return;
    this.packageId = this.data.id;
    this.packageName = this.data.name;
    VALUES.forEach(value => {
      this[value] = this.data[value];
    });

    this.hasRelease = (this.data.releaseCount > 0);
  }

  /**
   * @method _updateNamePreview
   * @description Fired from name input
   */
  _updateNamePreview() {
    this.name = this.$.name.value.toLowerCase().replace(/ /g, '-').replace(/[^a-zA-Z0-9_-]/g, '');
    this._onInputChange();
  }

  /**
   * @method _onInputChange
   * @description called when any input changes
   */
  _onInputChange() {
    this.fire('change');
  }

  /**
   * @method _onCreateBtnClicked
   * @description function fired when the create button is clicked
   */
  async _onCreateBtnClicked() {
    let data = this.getValues();

    if( data.name.length < 4 ) {
      return alert('Name must be at least 4 characters');
    }
    if( data.overview.length < 15 ) {
      return alert('Please provide a longer overview');
    }
    if( !data.organization) {
      return alert('Please select an organization');
    }

    try {
      await this._createPackage(data.name, data.overview, data.organization, data.language);
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