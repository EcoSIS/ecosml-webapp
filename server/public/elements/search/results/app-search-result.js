import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import template from "./app-search-result.html"

export default class AppSearchResult extends PolymerElement {

  static get template() {
    return template;
  }

  static get properties() {
    return {
      item : {
        type : Object,
        value : () => {}
      }
    }
  }

}

customElements.define('app-search-result', AppSearchResult);