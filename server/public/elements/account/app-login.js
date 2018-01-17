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

  async _onLoginClicked() {
    let username = this.$.username.value;
    let password = this.$.password.value;

    let response = await this._login(username, password);
    console.log(response);
  }

}

customElements.define('app-login', AppLogin);