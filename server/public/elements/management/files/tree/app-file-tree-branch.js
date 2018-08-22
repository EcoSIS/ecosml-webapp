import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-file-tree-branch.html"

export default class AppFileTreeBranch extends PolymerElement {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      data : {
        type : Object,
        value : null,
        observer : '_onDataUpdate'
      },
      files : {
        type : Array,
        value : () => []
      },
      directories : {
        type : Array,
        value : () => []
      },
      specialDirs : {
        type : Array,
        value : () => []
      },
      open : {
        type : Boolean,
        value : true
      }
    }
  }

  _onDataUpdate() {
    if( !this.data ) return;

    let files = [];
    for( var key in this.data.files ) {
      files.push(this.data.files[key]);
    }
    this.files = files;

    let directories = [];
    for( var key in this.data.directories ) {
      directories.push(this.data.directories[key]);
    }
    this.directories = directories;

    console.log(this.data);
  }

  toggle() {
    this.open = !this.open;
  }

}

customElements.define('app-file-tree-branch', AppFileTreeBranch);