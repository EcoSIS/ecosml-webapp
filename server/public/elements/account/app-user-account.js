import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import template from "./app-user-account.html"

import AuthInterface from "../interfaces/AuthInterface"
import "@polymer/iron-pages/iron-pages"

import "./app-login"

export default class AppUserAccount extends Mixin(PolymerElement)
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
      view : {
        type : String,
        value : 'login'
      },
      username : {
        type : String,
        value : ''
      }
    }
  }

  constructor() {
    super();
    this.active = true;
    this._onAuthUpdate(this._getAuthState());
  }

  /**
   * @method _onAuthUpdate
   * @description from AuthInterface, called when auth updates
   * 
   * @param {Object} e event payload
   */
  _onAuthUpdate(e){
    if( e.state === 'loggedIn' ) {
      this.loggedIn = true;
      this.view = 'account';
      this.username = e.username;
    } else {
      this.loggedIn = false;
      this.view = 'login';
      this.username = '';
    }
  }

}

customElements.define('app-user-account', AppUserAccount);