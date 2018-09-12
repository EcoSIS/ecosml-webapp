import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-about.html"

export default class AppAbout extends PolymerElement {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      
    }
  }

}

customElements.define('app-about', AppAbout);