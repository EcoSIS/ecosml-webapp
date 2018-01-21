import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import template from "./app-login.html"

import AuthInterface from "../interfaces/AuthInterface"

export default class AppLogin extends Mixin(PolymerElement)
  .with(EventInterface, AuthInterface) {

  static get template() {
    return template;
  }

  static get properties() {
    return {
      
    }
  }

  constructor() {
    super();
    this.active = true;
  }

  async _attemptLogin() {
    let username = this.$.username.value;
    let password = this.$.password.value;

    try {
      await this._login(username, password);
    } catch(e) {
      alert(e.details.message);
    }
  }

  async _onPassKeyUp(e) {
    if( e.which !== 13 ) return;
    this._attemptLogin();
  }

}

customElements.define('app-login', AppLogin);