import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import template from "./app-text-input.html"

export default class AppTextInput extends PolymerElement {

  static get template() {
    return template;
  }

  static get properties() {
    return {
      type : {
        type : String,
        value : 'text'
      },
      label : {
        type : String,
        value : ''
      },
      help : {
        type : String,
        value : ''
      },
      disabled : {
        type : Boolean,
        value : false
      }
    }
  }

  get value() {
    return this.$.input.value;
  }

  set value(value) {
    this.$.input.value = value;
  }

  _onChange(e) {
    this.dispatchEvent(new CustomEvent('change', {detail: {value: this.value}}));
  }

  _onKeyUp(e) {
    e = {
      which : e.which,
      value : this.value
    }
    this.dispatchEvent(new CustomEvent('keyup', {detail: e}));
  }

}

customElements.define('app-text-input', AppTextInput);