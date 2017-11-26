import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import template from "./app-keyword-input.html"

export default class AppKeywordInput extends PolymerElement {

  static get template() {
    return template;
  }

  static get properties() {
    return {
      keywords : {
        type : Array,
        value : () => []
      },
      label : {
        type : String,
        value : ''
      }
    }
  }

  get value() {
    return this.keywords;
  }

  set value(value) {
    this.keywords = this._clean(value);
  }

  /**
   * Cleanup input values
   */
  _clean(value) {
    if( typeof value === 'string' ) {
      value = value.split(',');
    }
    value = value.map(val => val.trim().toLowerCase());
    for( let i = value.length-1; i >= 0; i-- ) {
      if( !value[i] ) value.splice(i, 1);
    }
    return value;
  }

  /**
   * called from paper-input
   */
  _onKeyPress(e) {
    if( e.which === 13 ) this._onChange();
  }

  /**
   * Called from paper-input
   */
  _onChange(e) {
    this.appendKeywords(this.$.input.value);
    this.$.input.value = '';
    this.dispatchEvent(new CustomEvent('keyword-change', {detail: this.keywords}));
  }

  /**
   * Fired from remove btn 
   */
  _onRemoveClicked(e) {
    let val = e.currentTarget.getAttribute('value');
    let index = this.keywords.indexOf(val);
    this.keywords.splice(index, 1);
    
    this.value = this.keywords.slice(0);
    this.dispatchEvent(new CustomEvent('keyword-change', {detail: this.keywords}));
  }

  appendKeywords(value) {
    value = this._clean(value);
    value.forEach(val => {
      if( this.keywords.indexOf(val) === -1 ) {
        this.keywords.push(val);
      }
    });

    this.value = this.keywords.slice(0);
  }


}

customElements.define('app-keyword-input', AppKeywordInput);