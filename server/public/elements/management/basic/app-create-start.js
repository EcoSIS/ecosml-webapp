import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-create-start.html"

export default class AppCreateStart extends Mixin(PolymerElement)
  .with(EventInterface) {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      githubOrg : {
        type : String,
        value : APP_CONFIG.env.github
      },
      source : {
        type : String,
        value : '',
        observer : '_sourceObserver'
      }
    }
  }

  constructor() {
    super();
    this._injectModel('PackageEditor');
  }

  /**
   * @method _onPackageEditorDataUpdate
   * 
   * @param {*} e 
   */
  _onPackageEditorDataUpdate(e) {
    if( e.reset ) {
      this.reset();
    } else {
      this.source = e.payload.source || '';
    }
  }

  /**
   * @method reset
   * @description reset checkboxs and values
   */
  reset() {
    this.source = 'managed';
    this.$.repositoryTypeManaged.checked = true;
    this.$.repositoryTypeRegistered.checked = false;
  }

  /**
   * @method _sourceObserver
   * @description bound to source update events
   */
  _sourceObserver() {
    this.hasSourceSet = this.source ? true : false;

    this.$.repositoryTypeManaged.checked = false;
    this.$.repositoryTypeRegistered.checked = false;

    if( this.source === 'managed' ) {
      this.$.repositoryTypeManaged.checked = true;
    } else if( this.source === 'registered' ) {
      this.$.repositoryTypeRegistered.checked = true;
    }
  }

  /**
   * @method _onNextBtnClicked
   * @description bound to next button click event
   */
  _onNextBtnClicked() {
    this.fire('next-tab');
  }

  /**
   * @method _onSourceRadioChange
   * @description bound to change events from source radio
   * buttons
   */
  _onSourceRadioChange() {
    if( !this.$ ) return;
    
    let source;
    if( this.$.repositoryTypeManaged.checked ) {
      source = this.$.repositoryTypeManaged.value;
    } else if ( this.$.repositoryTypeRegistered.checked ) {
      source = this.$.repositoryTypeRegistered.value;
    } else {
      source = '';
    }

    this.PackageEditor.setData({source});
  }

}

customElements.define('app-create-start', AppCreateStart);