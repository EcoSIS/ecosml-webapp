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
      },

      zipBundleUrl : {
        type : String,
        value : ''
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
    
    if( Object.keys(e.payload).length === 0 ) return;

    let host = e.payload.host || 'github';
    let name = (e.payload.name || '').replace(/.*\//, '');
    this.zipBundleUrl = e.payload.htmlUrl + ((host === 'github') ? '/archive/master.zip' : '/-/archive/master/'+name+'-master.zip')
  }

}

customElements.define('app-files', AppFiles);