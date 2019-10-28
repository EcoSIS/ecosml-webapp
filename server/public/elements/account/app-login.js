import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-login.html"

import AuthInterface from "../interfaces/AuthInterface"

export default class AppLogin extends Mixin(PolymerElement)
  .with(EventInterface, AuthInterface) {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      ecosisHost : {
        type : String,
        value : APP_CONFIG.ecosis.dataHost
      }
    }
  }

  constructor() {
    super();
    
    if( window.INTEGRATION_TESTING ) {
      window.INTEGRATION_TESTING['app-login'] = this;
    }
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