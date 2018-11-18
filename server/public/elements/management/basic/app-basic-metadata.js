import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-basic-metadata.html"

import "./app-org-input"
import "./app-created-popup"
import PackageInterface from "../../interfaces/PackageInterface"
import AppStateInterface from "../../interfaces/AppStateInterface"
import AppFileTreeLeaf from "../files/tree/app-file-tree-leaf";

const VALUES = ['reponame', 'overview', 'organization', 'language', 'packageType'];

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

  get reponame() {
    if( this.editorData && this.editorData.source === 'registered') {
      let {org, repo, valid} = this._checkValidUrl();
      return org+'/'+repo;
    }
    return this.$.name.value || '';
  }

  set reponame(value) {
    if( this.editorData && this.editorData.source === 'registered') {
      this.$.url.value || '';
    }
    this.$.name.value = value || '';
  }

  get overview() {
    if( !this.$ ) return '';
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
    if( value === 'package' ) this.$.packageInput.checked = true;
    else this.$.standaloneInput.checked = true;
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
    this._checkUrlTimer = -1;
  }

  /**
   * @method _onPackageEditorDataUpdate
   * @description bound to PackageEditor event
   * 
   * @param {Object} e event 
   */
  _onPackageEditorDataUpdate(e) {
    this.packageId = e.payload.id || '';
    this.packageName = e.payload.name || '';

    // always needs to be set before loop below so
    // name setter knows to set URL or NAME input
    this.editorData = e.payload;

    if( e.reset ) {
      this.$.url.value = '';
      this.$.name.value = '';
    }

    for( let value of VALUES ) {
      let key = value;
      if(key === 'reponame') key = 'name';
      this[key] = e.payload[value];
    }

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
      let key = value;
      if(key === 'reponame') key = 'name';
      data[key] = this[value];
    });
    return data;
  }

  /**
   * @method _checkUrl
   * @description bound to keyup and change events of url input for managed repositories
   */
  _checkUrl() {
    if( this._lastCheckedUrl === this.$.url.value ) {
      return;
    }
    this._lastCheckedUrl = this.$.url.value;

    if( !this.$.url.value ) {
      return this.$.urlMessage.innerHTML = '';
    }

    this._onInputChange();
    let {org, repo, valid} = this._checkValidUrl();

    if( !valid ) {
      return this.$.urlMessage.innerHTML = 'Not a valid Github Repository Url';
    }
    this.$.urlMessage.innerHTML = `Checking (${org} / ${repo})...`;

    if( this._checkUrlTimer === -1 ) clearTimeout(this._checkUrlTimer);
    this._checkUrlTimer = setTimeout(() => {
      this._checkUrlTimer = -1;
      this._checkUrlAsync(org, repo);
    }, 300);
  }

  _checkValidUrl() {
    let url = this.$.url.value;
    let path = url;
    if( url.match(/^http/) ) {
      path = new URL(url).pathname;
    } else if( url.match(/github\.com/) ) {
      path = url.replace(/.*github\.com/);
    }
    let [org, repo] = path.replace(/^\//, '').split('/');

    return {org, repo, valid: (org && repo ? true : false)}
  }

  async _checkUrlAsync(org, repo) {
    this.registeredUrlExists = !(await this.PackageEditor.isNameAvailable(repo, org));
    if( !this.registeredUrlExists ) {
      this.$.urlMessage.innerHTML = `Unable to access or invalid: ${org} / ${repo}`;
    } else {
      this.$.urlMessage.innerHTML = `Valid: ${org} / ${repo}`;
    }
  }

  /**
   * @method _updateNamePreview
   * @description Fired from change event on name input
   */
  _updateNamePreview() {
    this.name = this._getCleanName();
    this._onInputChange();
  }

  /**
   * @method _getCleanName
   * @description strip bad characters, replace spaces with dashes
   */
  _getCleanName() {
    return this.$.name.value.toLowerCase().replace(/ /g, '-').replace(/[^a-zA-Z0-9_-]/g, '');
  }

  /**
   * @method _onNameInputKeyUp
   * @description bound to keyup event for repo name input
   */
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

    if( !data.source ) {
      return alert('Please select a repository type');
    }

    if( data.source === 'managed' ) {
      if( !this.nameAvailable ) {
        return alert('Name is not available');
      }
      if( (data.name || '').length < 4 ) {
        return alert('Name must be at least 4 characters');
      }
      if( (data.overview || '').length < 15 ) {
        return alert('Please provide a longer overview');
      }
    } else if( data.source === 'registered' ) {
      if( !this.registeredUrlExists ) {
        return alert('Invalid registered GitHub Url');
      }
    } else {
      return alert('Unknown repository type: '+data.source);
    }

    if( !data.organization) {
      return alert('Please select an organization');
    }
    if( !data.packageType ) {
      return alert('Please select a package type');
    }

    try {
      await this.PackageModel.create(data.name, data.overview, data.organization, data.language, data.packageType, data.source);
      if( data.source === 'managed' ) this.$.created.open();
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