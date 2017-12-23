import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import template from "./app-theme-input.html"

import VOCAB from "../../lib/controlled-vocabulary"

const THEMES = [];
for( let theme in VOCAB ) {
  THEMES.push(theme);
}

export default class AppThemeInput extends PolymerElement {

  static get template() {
    return template;
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
        value : ''
      },
      selectedFamily : {
        type : String,
        value : ''
      },
      selectedSpecific : {
        type : String,
        value : ''
      }
    }
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

    if( !theme ) return;

    let familyOptions = [];
    for( let family in VOCAB[this.selectedTheme] ) {
      familyOptions.push(family);
    }

    this.familyOptions = familyOptions;
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
  }

  /**
   * @method _onSpecificSelect
   * @description called when family select box is changed
   */
  _onSpecificSelect(e) {
    this.selectedSpecific = e.currentTarget.value;
  }


}

customElements.define('app-theme-input', AppThemeInput);