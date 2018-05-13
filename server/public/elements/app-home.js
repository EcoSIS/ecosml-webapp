import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-home.html"

import AuthInterface from "./interfaces/AuthInterface"

export default class AppHome extends Mixin(PolymerElement)
  .with(EventInterface, AuthInterface) {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      loggedIn : {
        type : Boolean,
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
    } else {
      this.loggedIn = false;
    }
  }

}

customElements.define('app-home', AppHome);