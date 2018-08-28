import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-file-tree-leaf.html"
import bytes from "bytes"

export default class AppFileTreeLeaf extends PolymerElement {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      data : {
        type : Object,
        value : null
      },
      bytes : {
        type : String,
        value : '',
        computed : '_computeBytes(data)'
      }
    }
  }

  _computeBytes(data) {
    if( !data ) return '0';
    return bytes(data.size);
  }

}

customElements.define('app-file-tree-leaf', AppFileTreeLeaf);