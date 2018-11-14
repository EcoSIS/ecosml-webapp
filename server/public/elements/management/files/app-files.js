import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-files.html"

import "./tree/app-file-tree"
import "./app-folder-uploader"

export default class AppFiles extends Mixin(PolymerElement)
  .with(EventInterface) {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      files : {
        type : Object,
        value : () => ({})
      },
      
      githubOrg : {
        type : String,
        value : APP_CONFIG.env.github
      },

      language : {
        type : String,
        value : ''
      },

      packageName : {
        type : String,
        value : ''
      },

      editorData : {
        type : Object,
        value : () => ({})
      },

      isManagedSource : {
        type : Boolean,
        value : false
      }
    }
  }

  constructor() {
    super();
    this._injectModel('PackageEditor');
  }

  /**
   * @method _onPackageEditorDataUpdate
   * @description bound to PackageEditor event
   * 
   * @param {Object} e event 
   */
  _onPackageEditorDataUpdate(e) {
    this.editorData = e.payload;
    this.isManagedSource = (e.payload.source === 'registered') ? false : true;
  }

}

customElements.define('app-files', AppFiles);