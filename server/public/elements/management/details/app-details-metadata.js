import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import template from "./app-details-metadata.html"

import "./app-keyword-input"
import "./app-markdown-editor"
import "./app-theme-input"

const VALUES = ['description', 'keywords', 'theme', 'family', 'specific'];

export default class AppDetailsMetadata extends Mixin(PolymerElement)
  .with(EventInterface) {

  static get template() {
    return template;
  }

  static get properties() {
    return {
      data : {
        type : Object,
        value : () => {},
        observer : '_onDataUpdate'
      }
    }
  }

  get description() {
    return this.$.description.value;
  }

  set description(value) {
    this.$.description.value = value || '';
  }

  get keywords() {
    return this.$.keywords.value;
  }

  set keywords(value) {
    this.$.keywords.value = value || '';
  }

  get theme() {
    return this.$.theme.selectedTheme;
  }

  set theme(value) {
    this.$.theme.selectedTheme = value || '';
  }

  get family() {
    return this.$.theme.selectedFamily;
  }

  set family(value) {
    this.$.theme.selectedFamily = value || '';
  }

  get specific() {
    return this.$.theme.selectedSpecific;
  }

  set specific(value) {
    this.$.theme.selectedFpecific = value || '';
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
      data[value] = this[value];
    });
    return data;
  }

  /**
   * @method _onDataUpdate
   * @description called when data property updates
   */
  _onDataUpdate() {
    if( !this.data ) return;
    VALUES.forEach(value => {
      this[value] = this.data[value];
    });
  }

  /**
   * @method _onInputChange
   * @description called when any input changes
   */
  _onInputChange() {
    this.fire('change');
  }

  /**
   * @method _onThemeUpdate
   * @description called from the app-theme-input when a value updates
   */
  _onThemeUpdate(e) {
    this.theme = e.detail.theme;
    this.family = e.detail.family;
    this.specific = e.detail.specific;

    this._onInputChange();
  }

}

customElements.define('app-details-metadata', AppDetailsMetadata);