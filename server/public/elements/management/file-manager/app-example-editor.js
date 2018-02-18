import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import template from "./app-example-editor.html"

import PackageInterface from "../../interfaces/PackageInterface"

export default class AppExampleEditor extends PolymerElement {

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

  _onOpenChange() {
    this._updatePanelHeight();
  }

  /**
   * @method _updatePanelHeight
   * @description make sure main panel is set to correct height
   */
  _updatePanelHeight() {
    setTimeout(() => {
      if( !this.open ) {
        return this.$.panel.style.height = '0px';
      }

      console.log(this.$.reveal.offsetHeight+'px');
      this.$.panel.style.height = this.$.reveal.offsetHeight+'px';
    }, 0);
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

  _onExampleNameChange() {
    this.label = this._cleanLabelName(this.$.name.value);
    // todo: this is a special call
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