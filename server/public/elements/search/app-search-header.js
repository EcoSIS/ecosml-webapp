import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import template from "./app-search-header.html"

export default class AppSearchHeader extends PolymerElement {

  static get template() {
    return template;
  }

  static get properties() {
    return {
      
    }
  }

}

customElements.define('app-search-header', AppSearchHeader);