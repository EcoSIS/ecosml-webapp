import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import template from "./app-filter-checkbox.html"

export default class AppFilterCheckbox extends PolymerElement {

  static get template() {
    return template;
  }

  static get properties() {
    return {
      filter : {
        type : Object,
        value : () => {}
      },
      checked : {
        type : Boolean,
        value : false,
        reflectToAttribute : true,
        observer : '_onValueChanged'
      }
    }
  }

  ready() {
    super.ready();
    this.addEventListener('click', e => this._onClick(e));
  }

  _onClick() {
    this.toggle();
    this.dispatchEvent(new CustomEvent('change', {detail: {checked: this.checked}}));
  }

  toggle() {
    this.checked = !this.checked;
  }

}

customElements.define('app-filter-checkbox', AppFilterCheckbox);