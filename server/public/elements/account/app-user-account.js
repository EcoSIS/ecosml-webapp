import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-user-account.html"

import AuthInterface from "../interfaces/AuthInterface"
import SearchInterface from "../interfaces/SearchInterface"

import "@polymer/iron-pages/iron-pages"

import "./app-login"
import { stringify } from "querystring";

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
        value : APP_CONFIG.ecosisDataHost
      },

      githubUsername : {
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

  ready() {
    super.ready();
    if( APP_CONFIG.githubUsername ) {
      this.$.githubUsername.value = APP_CONFIG.githubUsername;
    }
  }

  /**
   * @method _onAuthUpdate
   * @description from AuthInterface, called when auth updates
   * 
   * @param {Object} e event payload
   */
  _onAuthUpdate(e){
    console.log(e);
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
    this.ownerPackages = resp.body.results;
  }

  _onOrgsUpdate(e) {
    if( e.state !== 'loaded' ) return;
    this.organizations = e.payload;
  }

  /**
   * @method _onUpdateGithubClicked
   * @description bound to click event on update github button
   */
  async _onUpdateGithubClicked() {
    let username = this.$.githubUsername.value;
    if( !username ) {
      if( !confirm('Are you sure you want to unlink your github account?') ) return; 
    } else {
      if( !confirm(`Are you sure your github username is: ${username}`) ) return;
    }

    this.$.updateGithubBtn.setAttribute('disabled', 'disabled');
    await this.AuthModel.setGithubUsername(username);
    this.$.updateGithubBtn.removeAttribute('disabled');
  }

}

customElements.define('app-user-account', AppUserAccount);