import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import template from "./app-home.html"

export default class AppHome extends PolymerElement {

  static get template() {
    return template;
  }

  static get properties() {
    return {
      
    }
  }

}

customElements.define('app-home', AppHome);