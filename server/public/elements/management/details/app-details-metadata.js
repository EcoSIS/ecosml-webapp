import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-details-metadata.html"

import "./app-keyword-input"
import "./app-markdown-editor"
import "./app-multi-theme-input"

import controlledVocabulary from "../../../lib/models/ControlledVocabulary"

const VALUES = ['description', 'keywords'];

export default class AppDetailsMetadata extends Mixin(PolymerElement)
  .with(EventInterface) {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      data : {
        type : Object,
        value : () => {},
        observer : '_onDataUpdate'
      },
      active : {
        type : Boolean,
        value : false,
        observer : '_onActiveChange'
      }
    }
  }

  get description() {
    return this.$.description.value;
  }

  set description(value) {
    this.$.description.value = value || '';
  }

  /**
   * @method _onActiveChange
   * @description bound to 'active' property observer.
   */
  _onActiveChange() {
    this.$.description.autoSize();
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

    data.theme = this.theme || [];
    data.family = this.family || [];
    data.specific = this.specific || [];

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

    this.theme = this.data.theme || [];
    this.family = this.data.family || [];
    this.specific = this.data.specific || [];

    let themes = controlledVocabulary.getThemeObjectArray(this.data);
    this.$.theme.themes = themes;
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
   * @description called from the app-multi-theme-input when a value updates
   */
  _onThemeUpdate(e) {
    let values = controlledVocabulary.themeObjectArrayToPackageArrays(this.$.theme.themes);

    this.theme = values.theme;
    this.family = values.family;
    this.specific = values.specific;

    this._onInputChange();
  }

}

customElements.define('app-details-metadata', AppDetailsMetadata);