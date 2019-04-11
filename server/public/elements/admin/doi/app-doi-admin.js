import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-doi-admin.html"

export default class AppDoiAdmin extends PolymerElement {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      
    }
  }

}

customElements.define('app-doi-admin', AppDoiAdmin);