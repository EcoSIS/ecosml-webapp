import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import template from "./app-example-editor.html"

import PackageInterface from "../../interfaces/PackageInterface"

export default class AppExampleEditor extends Mixin(PolymerElement)
  .with(EventInterface, PackageInterface) {

  static get template() {
    return template;
  }

  static get properties() {
    return {
      open : {
        type : Boolean,
        value : false,
        observer : '_onOpenChange'
      },

      directory : {
        type : String,
        value : ''
      },

      label : {
        type : String,
        value : '',
        observer : "_onLabelChange"
      },

      inputDir : {
        type : String,
        value : ''
      },

      outputDir : {
        type : String,
        value : ''
      },

      transformDir : {
        type : String,
        value : ''
      }
    }
  }

  constructor() {
    super();
    this._updatePanelHeight = this._updatePanelHeight.bind(this);
  }

  attachedCallback() {
    super.attachedCallback();
    window.addEventListener('resize', this._updatePanelHeight);
  }

  dettachedCallback() {
    super.dettachedCallback();
    window.removeEventListener('resize', this._updatePanelHeight);
  }

  /**
   * @method toggle
   * @description toggle visibility of main panel
   */
  toggle() {
    this.open = !this.open;
  }

  /**
   * @method _onOpenChange
   * @description fired from property observer.  called when open value changes
   */
  _onOpenChange() {
    this._updatePanelHeight();
  }

  /**
   * @method _updatePanelHeight
   * @description make sure main panel is set to correct height
   */
  _updatePanelHeight() {
    if( !this.open ) this.$.panel.style.display = 'none';
    else this.$.panel.style.display = 'block';
  }

  /**
   * @method _onFileUpdate
   * @description via PackageInterface, called whenever a file is updated
   * 
   * @param {Object} e 
   */
  _onFileUpdate(e) {
    if( e.payload.dir !== this.directory ) return;
    this._updatePanelHeight();
  }

  /**
   * @method _onExampleNameChange
   * @description fired from the name input on-change event
   */
  async _onExampleNameChange() {
    let src = this.label;
    let dst = this._cleanLabelName(this.$.name.value);
    let packageId = this._getSelectedPackageId();
    
    this.$.name.disabled = true;
    try {
      this._moveExampleDirectory(packageId, src, dst);
    } catch(e) {
      // noop?
    }

    this.$.name.disabled = false;
    this.label = dst;
  }

  async _onDeleteClicked() {
    try {
      this._deleteExampleDirectory(packageId, this.label);
    } catch(e) {
      // noop?
    }

    this.fire('example-deleted', {label: this.label});
  }

  _onLabelChange() {
    this.$.name.value = this.label;
    this.directory = '/examples/'+this.label;
    this.inputDir = this.directory+'/input';
    this.outputDir = this.directory+'/output';
    this.transfromDir = this.directory+'/transform';
  }

  _cleanLabelName(txt) {
    return txt.toLowerCase()
      .replace(/ /g, '_')
      .replace(/\W/g, '');
  }

}

customElements.define('app-example-editor', AppExampleEditor);