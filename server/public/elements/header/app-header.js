import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-header.html"

import AuthInterface from "../interfaces/AuthInterface"

import "./app-auth-icon"

export default class AppHeader extends Mixin(PolymerElement)
  .with(EventInterface, AuthInterface) {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      menuActive : {
        type : Boolean,
        value : false
      },
      
      loggedIn : {
        type : Boolean,
        value : false
      },

      sandbox : {
        type : Boolean,
        value : false
      },

      admin : {
        type : Boolean,
        value : false
      }
    }
  }

  ready() {
    super.ready();

    if( APP_CONFIG.env.client !== 'prod' ) {
      this.$.titleExtra.innerHTML = 'Sandbox';
      window.title = 'EcoSML Sandbox - Spectral Model Library';
      this.sandbox = true;
    }

    this.admin = APP_CONFIG.admin;

    // window.addEventListener('click', () => this.hideMenu());
  }

  /**
   * @method _onAuthUpdate
   * @description from AuthInterface, called when auth updates
   * 
   * @param {Object} e event payload
   */
  _onAuthUpdate(e) {
    this.loggedIn = (e.state === 'loggedIn');
  }

  /**
   * @method _onMenuIconClicked
   * @description called when the menu icon is clicked
   * 
   * @param {Object} e html click event
   */
  _onMenuIconClicked(e) {
    e.preventDefault();
    e.stopPropagation();
    // this.toggleMenu();
    this.dispatchEvent(
      new CustomEvent('open-menu')
    );
  }

}

customElements.define('app-header', AppHeader);