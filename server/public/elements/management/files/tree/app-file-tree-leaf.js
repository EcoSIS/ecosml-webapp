import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-file-tree-leaf.html"

export default class AppFileTreeLeaf extends PolymerElement {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      data : {
        type : Object,
        value : null
      }
    }
  }

}

customElements.define('app-file-tree-leaf', AppFileTreeLeaf);