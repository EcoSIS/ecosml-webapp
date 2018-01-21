import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import template from "./app-auth-icon.html"

import AuthInterface from "../interfaces/AuthInterface"

export default class AppAuthIcon extends Mixin(PolymerElement)
  .with(EventInterface, AuthInterface) {

  static get template() {
    return template;
  }

  static get properties() {
    return {
      loggedIn : {
        type : Boolean,
        value : false
      },
      username : {
        type : String,
        value : false
      }
    }
  }

  constructor() {
    super();
    this.active = true;
  }

  /**
   * @method _onAuthUpdate
   * @description from AuthInterface, called when auth updates
   * 
   * @param {Object} e event payload
   */
  _onAuthUpdate(e) {
    if( e.state === 'loggedIn' ) {
      this.loggedIn = true;
      this.username = e.username;
    } else {
      this.loggedIn = false;
      this.username = '';
    }
  }

}

customElements.define('app-auth-icon', AppAuthIcon);