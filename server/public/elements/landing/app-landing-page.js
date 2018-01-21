import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import template from "./app-landing-page.html"
import { markdown } from "markdown";

import AppStateInterface from "../interfaces/AppStateInterface"
import AuthInterface from "../interfaces/AuthInterface"
import PackageInterface from "../interfaces/PackageInterface"
import SearchInterface from "../interfaces/SearchInterface"

export default class AppLandingPage extends Mixin(PolymerElement)
  .with(EventInterface, AppStateInterface, PackageInterface, SearchInterface, AuthInterface) {

  static get template() {
    return template;
  }

  static get properties() {
    return {
      package : {
        type : Object,
        value : null,
        observer : 'render'
      },
      release : {
        type : Object,
        value : null
      },
      themeLink :  {
        type : String,
        value : ''
      },
      familyLink :  {
        type : String,
        value : ''
      },
      specificLink :  {
        type : String,
        value : ''
      },
      username : {
        type : String,
        value : ''
      },
      userHasWriteAccess : {
        type : Boolean,
        value : false
      }
    }
  }

  constructor() {
    super();
    this.active = true;
    this._onAuthUpdate(this._getAuthState());
  }

  /**
   * @method _onAppStateUpdate
   * @description from AppStateInterface, called when app state updates
   */
  async _onAppStateUpdate(e) {
    if( e.location.path[0] !== 'package' ) return;
    let pkgWrapper = await this._getPackage(e.location.path[1]);
    this.package = pkgWrapper.payload;

    if( this.package.keywords ) {
      this.$.keywords.innerHTML = this.package.keywords.map(keyword => {
        return `<div><a href="${this._getLink('keywords', keyword)}">${keyword}</a></div>`;
      }).join('');
    }

    if( this.package.releases ) {
      let r = this.package.releases[this.package.releases.length - 1];
      this.release = {
        name : r.name,
        description : r.body,
        downloadUrl : r.zipballUrl
      }
    } else {
      this.releases = null;
    }

    this.themeLink = this._getLink('theme');
    this.familyLink = this._getLink('family');
    this.specificLink = this._getLink('specific');

    this.userHasWriteAccess = false;
    if( !this.username ) return;

    if( this.package.owner === this.username ) {
      return this.userHasWriteAccess = true;
    }

    let orgs = await this._getUserOrganizations();
    let inOrg = orgs.payload.find(org => org.name === this.package.organization);

    if( inOrg ) {
      this.userHasWriteAccess = true;
    }
  }

  /**
   * @method _onAuthUpdate
   * @description from AuthInterface, called when auth updates
   * 
   * @param {Object} e event payload
   */
  _onAuthUpdate(e) {
    this.username = e.username || '';
  }

  /**
   * @method _getLink
   * @description create a query url for given attr/value pair.  if no
   * value is passed, the this.package will be used.
   * 
   * @param {String} attr attribute to filter in query
   * @param {*} value value to filter on
   * 
   * @returns {String} url for query
   */
  _getLink(attr, value) {
    let query = this._getEmptySearchQuery();

    if( !value ) {
      value = this.package[attr];
    }
    
    if( value ) {
      query.filters.push({[attr]: value});
    }

    return this._searchQueryToUrl(query);
  }

  render() {
    if( !this.package ) return;
    this.$.readme.innerHTML = markdown.toHTML(this.package.description || '');
  }

}

customElements.define('app-landing-page', AppLandingPage);