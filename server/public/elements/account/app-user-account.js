import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-user-account.html"

import AuthInterface from "../interfaces/AuthInterface"
import SearchInterface from "../interfaces/SearchInterface"

import "@polymer/iron-pages/iron-pages"

import "./app-login"
import "./app-github-authorize"

export default class AppUserAccount extends Mixin(PolymerElement)
  .with(EventInterface, AuthInterface, SearchInterface) {

  static get template() {
    return html([template]);
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
      },

      organizations : {
        type : Array,
        value : () => []
      },

      ecosisHost : {
        type : String,
        value : APP_CONFIG.ecosis.dataHost
      }
    }
  }

  constructor() {
    super();
    this.active = true;
    this._setAuth(this._getAuthState());
  }

  /**
   * @method _setAuth
   * @description called from constructor
   * 
   * @param {Object} e auth state
   */
  _setAuth(e){
    if( e.state === 'loggedIn' ) {
      this.loggedIn = true;
      this.view = 'account';
      this.username = e.username;
      this._renderOwnerPackages();
    } else {
      this.loggedIn = false;
      this.view = 'login';
      this.username = '';
    }
  }

  async _renderOwnerPackages() {
    if( this.renderedOwner === this.username ) return;
    this.renderedOwner = this.username;

    let resp = await this._getOwnerPackages(this.username);
    let pkgs = resp.body.results.map(item => {
      if( !item.fullName ) item.fullName = item.name;
      if( !item.host ) item.host = 'github';
      return item;
    });
    pkgs.sort((a, b) => a.name > b.name ? 1 : -1);

    this.ownerPackages = pkgs;
  }

  _onOrgsUpdate(e) {
    if( e.state !== 'loaded' ) return;
    this.organizations = e.payload;
  }

}

customElements.define('app-user-account', AppUserAccount);