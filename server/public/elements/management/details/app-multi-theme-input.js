import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-multi-theme-input.html"

import "./app-theme-input"

export default class AppMultiThemeInput extends PolymerElement {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      themes : {
        type : Array,
        value : () => []
      }
    }
  }

  /**
   * @method _onAddClicked
   * @description bound to add button click event.  Create a new theme row
   */
  _onAddClicked() {
    this.push('themes', {theme:'', family: '', specific: ''});
    this._onUpdate();
  }

  /**
   * @method _onDeleteClicked
   * @description bound to delete button click event.  delete the theme at
   * provided index.
   * 
   * @param {*} e 
   */
  _onDeleteClicked(e) {
    let index = parseInt(e.currentTarget.getAttribute('index'));
    this.splice('themes', index, 1);
    this._onUpdate();
  }

  _onThemeUpdate(e) {
    let index = parseInt(e.currentTarget.getAttribute('index'));
    this.themes[index] = e.detail;
    this._onUpdate();
  }

  _onUpdate() {
    this.dispatchEvent(new CustomEvent('update', {detail: this.themes}));
  }


}

customElements.define('app-multi-theme-input', AppMultiThemeInput);