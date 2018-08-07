import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-file-diff.html"

import "../../utils/app-popup"

export default class AppFileDiff extends PolymerElement {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      files : {
        type : Array,
        value : () => []
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();

    if( !this._init ) {
      this._init = true;
      (this.parentElement || this.parentNode).removeChild(this);
      document.body.appendChild(this);
    }
  }

  show(files) {
    this.files = files;
    this.$.popup.open();
  }

  _cancel() {
    this.$.popup.close();
  }

}

customElements.define('app-file-diff', AppFileDiff);