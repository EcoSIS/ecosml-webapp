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
      active : {
        type : Boolean,
        value : false,
        observer : '_onActiveChange'
      },

      isManagedSource : {
        type : Boolean,
        value : false
      },

      githubUrl : {
        type : String,
        value : ''
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
    this.$.keywords.value = value || [];
  }

  constructor() {
    super();
    this._injectModel('PackageEditor');
  }

  /**
   * @method _onActiveChange
   * @description bound to 'active' property observer.
   */
  _onActiveChange() {
    this.$.description.autoSize();
  }

  /**
   * @method _onPackageEditorDataUpdate
   * @description bound to PackageEditor event
   * 
   * @param {Object} e event 
   */
  _onPackageEditorDataUpdate(e) {
    this.packageId = e.payload.id || '';
    this.packageName = e.payload.name || '';
    this.editorData = e.payload;

    this.$.description.pkgName = this.packageName;
    for( let value of VALUES ) {
      this[value] = e.payload[value];
    }

    this.theme = e.payload.theme || [];
    this.family = e.payload.family || [];
    this.specific = e.payload.specific || [];

    let themes = controlledVocabulary.getThemeObjectArray(e.payload);
    this.$.theme.themes = themes;

    this.isManagedSource = (e.payload.source === 'registered') ? false : true;
    this.githubUrl = e.payload.htmlUrl;
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
   * @method _onInputChange
   * @description called when any input changes
   */
  _onInputChange() {
    this.PackageEditor.setData(this.getValues());
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