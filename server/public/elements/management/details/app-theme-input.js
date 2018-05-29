import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-theme-input.html"

import VOCAB from "../../../lib/controlled-vocabulary"

const THEMES = [];
for( let theme in VOCAB ) {
  THEMES.push(theme);
}

export default class AppThemeInput extends PolymerElement {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      themeOptions : {
        type : Array,
        value : () => THEMES
      },
      familyOptions : {
        type : Array,
        value : () => []
      },
      specificOptions : {
        type : Array, 
        value : () => []
      },
      selectedTheme : {
        type : String,
        value : '',
        observer : '_setValues'
      },
      selectedFamily : {
        type : String,
        value : '',
        observer : '_setValues'
      },
      selectedSpecific : {
        type : String,
        value : '',
        observer : '_setValues'
      },
      showSpecific : {
        type : Boolean,
        value : false,
        computed : '_showSpecific(selectedFamily, specificOptions)'
      }
    }
  }

  constructor() {
    super();
    this._setValuesTimes = -1;
  }

  /**
   * @method _setValues
   * @description bound to property observers
   */
  _setValues() {
    if( this._setValuesTimer !== -1 ) {
      clearTimeout(this._setValuesTimer);
    }

    this._setValuesTimer = setTimeout(() => {
      this._setValuesTimer = -1;
      this._setValuesAsync();  
    }, 50);
  }

  _setValuesAsync() {
    this.$.theme.value = this.selectedTheme;

    if( this.selectedTheme ) {
      let familyOptions = [];
      for( let family in VOCAB[this.selectedTheme] ) {
        familyOptions.push(family);
      }
      this.familyOptions = familyOptions;
    }

    if( this.selectedFamily ) {
      this.specificOptions = VOCAB[this.selectedTheme][this.selectedFamily];
    }

    // have to give dom repeat time to render :(
    requestAnimationFrame(() => {
      this.$.family.value = this.selectedFamily;
      this.$.specific.value = this.selectedSpecific;
    });
    
  }

  /**
   * @method _onThemeSelect
   * @description called when theme select box is changed
   */
  _onThemeSelect(e) {
    let theme = e.currentTarget.value;
    if( this.selectedTheme === theme ) return;

    this.selectedTheme = theme;
    this.selectedFamily = '';
    this.$.family.value = '';
    this.selectedSpecific = '';
    this.$.specific.value = '';

    if( !theme ) {
      this._fireUpdateEvent();
      return;
    }

    let familyOptions = [];
    for( let family in VOCAB[this.selectedTheme] ) {
      familyOptions.push(family);
    }

    this.familyOptions = familyOptions;
    this._fireUpdateEvent();
  }

  /**
   * @method _onFamilySelect
   * @description called when family select box is changed
   */
  _onFamilySelect(e) {
    let family = e.currentTarget.value;
    if( this.selectedFamily === family ) return;

    this.selectedFamily = family;
    this.selectedSpecific = '';
    this.$.specific.value = '';

    if( !family ) return;

    this.specificOptions = VOCAB[this.selectedTheme][this.selectedFamily];
    this._fireUpdateEvent();
  }

  /**
   * @method _onSpecificSelect
   * @description called when family select box is changed
   */
  _onSpecificSelect(e) {
    this.selectedSpecific = e.currentTarget.value;
    this._fireUpdateEvent();
  }

  /**
   * @method _fireUpdateEvent
   * @description called whenever a value changes
   */
  _fireUpdateEvent() {
    let e = {
      theme : this.selectedTheme,
      family : this.selectedFamily,
      specific : this.selectedSpecific
    }
    this.dispatchEvent(new CustomEvent('update', {detail: e}));
  }

  /**
   * @method _showSpecific
   * @description computes 'showSpecific' property
   * 
   * @param {Boolean} selectedFamily 
   * @param {Array} specificOptions 
   */
  _showSpecific(selectedFamily, specificOptions) {
    return (selectedFamily && specificOptions && specificOptions.length);
  }


}

customElements.define('app-theme-input', AppThemeInput);