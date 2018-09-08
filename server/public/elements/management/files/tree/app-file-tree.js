import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-file-tree.html"

import PackageInterface from "../../../interfaces/PackageInterface"
import "./app-file-tree-branch"
import "./app-file-tree-leaf"

export default class AppFileTree extends Mixin(PolymerElement)
  .with(EventInterface, PackageInterface) {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      
    }
  }

  constructor() {
    super();
    this.active = true;
    this.data = {
      name : '/',
      files : {},
      directories : {}
    };
    this.updateTimer = -1;
  }

  /**
   * @method _onFileUpdate
   * @description via PackageInterface, called whenever files load.   This fires before
   * file events
   */
  _onSpecialDirsUpdate(e) {
    this.specialDirs = e.payload;
  }

  _onSelectedPackageUpdate() {
    this.data = {
      name : '/',
      files : {},
      directories : {}
    };
    this._onUpdate();
  }

  /**
   * @method _onFileUpdate
   * @description via PackageInterface, called whenever a file is updated
   * 
   * @param {Object} e 
   */
  _onFileUpdate(e) {
    let file = e.payload;
    let path = this.data;

    e.payload.dir
      .replace(/^\//,'')
      .split('/')
      .forEach(name => {
        if( !name ) return; 
        if( !path.directories[name] ) {
          path.directories[name] = {
            name,
            path : e.payload.dir,
            files : {},
            directories : {}
          };

          for( var key in this.specialDirs ) {
            if( this.specialDirs[key] === e.payload.dir ) {
              path.directories[name].special = true;
              path.directories[name].specialType = key;
              break;
            }
          }

        }
        path = path.directories[name];
      });
    
    path.files[file.filename] = file;
    this._debounceUpdate();
  }

  _debounceUpdate() {
    if( this.updateTimer !== -1 ) {
      clearTimeout(this.updateTimer);
    }

    this.updateTimer = setTimeout(() => {
      this.updateTimer = -1;
      this._onUpdate();
    }, 100);
  }

  _onUpdate() {
    this.data.specialDirs = this.specialDirs;
    this.$.root.data = Object.assign({}, this.data);
  }

}

customElements.define('app-file-tree', AppFileTree);