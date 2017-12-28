import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import template from "./app-landing-page.html"
import { markdown } from "markdown";

import AppStateInterface from "../interfaces/AppStateInterface"
import PackageInterface from "../interfaces/PackageInterface"
import SearchInterface from "../interfaces/SearchInterface"

export default class AppLandingPage extends Mixin(PolymerElement)
  .with(EventInterface, AppStateInterface, PackageInterface, SearchInterface) {

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
      }
    }
  }

  constructor() {
    super();
    this.active = true;
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