import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import template from "./app-login.html"

export default class AppLogin extends PolymerElement {

  static get template() {
    return template;
  }

  static get properties() {
    return {
      
    }
  }

}

customElements.define('app-login', AppLogin);