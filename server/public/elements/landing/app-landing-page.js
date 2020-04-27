import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-landing-page.html"

import AppStateInterface from "../interfaces/AppStateInterface"
import AuthInterface from "../interfaces/AuthInterface"
import PackageInterface from "../interfaces/PackageInterface"
import SearchInterface from "../interfaces/SearchInterface"

import "../utils/app-markdown"

export default class AppLandingPage extends Mixin(PolymerElement)
  .with(EventInterface, AppStateInterface, PackageInterface, SearchInterface, AuthInterface) {

  static get template() {
    return html([template]);
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
      githubOrg : {
        type : String,
        value : APP_CONFIG.env.github
      },
      host : {
        type : String,
        value : ''
      },
      releasesUrl : {
        type : String,
        value : ''
      },
      userHasWriteAccess : {
        type : Boolean,
        value : false
      },
      isPackageModule : {
        type : Boolean,
        value : false
      },
      dois : {
        type : Array,
        value : []
      },
      lastSearch : {
        type : String,
        value : '/search'
      },
      hasDois : {
        type : Boolean,
        value : false
      },
      hasKeywords : {
        type : Boolean,
        value : false
      },
      origin : {
        type : String,
        value : false
      }
    }
  }

  constructor() {
    super();
    this.active = true;
    this.origin = window.location.origin;
    this._onAuthUpdate(this._getAuthState());
  }

  reset() {
    this.package = {};
  }

  /**
   * @method _onAppStateUpdate
   * @description from AppStateInterface, called when app state updates
   */
  async _onAppStateUpdate(e) {
    if( e.page === 'search' ) {
      this.lastSearch = e.location.fullpath;
    }
    if( e.page !== 'package' || !e.selectedPackageId ) return;
    if( this.selectedPackageId === e.selectedPackageId ) return;

    this.selectedPackageId = e.selectedPackageId;
    let pkgWrapper = await this.PackageModel.get(e.selectedPackageId);

    if( this.selectedPackageId !== pkgWrapper.payload.id && 
      this.selectedPackageId !== pkgWrapper.payload.name ) return;

    this.package = pkgWrapper.payload;

    if( this.package.keywords ) {
      this.$.keywords.innerHTML = this.package.keywords.map(keyword => {
        return `<div><a href="${this._getLink('keywords', keyword)}">${keyword}</a></div>`;
      }).join('');
    }

    if( this.package.releases && this.package.releases.length ) {
      let r = this.package.releases[this.package.releases.length - 1];
      this.release = {
        name : r.name,
        description : r.body,
        downloadUrl : r.zipballUrl
      }
    } else {
      this.releases = null;
    }

    this.host = this.package.host || 'github';
    this.releasesUrl = this.package.htmlUrl + ((this.host === 'github') ? '/releases' : '/-/tags');
    this.themes = this._createThemeLinks('theme');
    this.families = this._createThemeLinks('family');
    this.specifics = this._createThemeLinks('specific');
    this.showThemes = (this.themes.length > 0);
    this.showFamilies = (this.families.length > 0);
    this.showSpecifics = (this.specifics.length > 0);
    this.isPackageModule = (this.package.packageType === 'package') ? true : false;

    this.hasDois = (this.package.dois || []).length > 0;
    this.dois = (this.package.dois || []).map(doi => {
      doi = Object.assign({}, doi);
      doi.active = (e.location.query['doi-tag'] === doi.tag);
      return doi;
    });

    this.hasKeywords = (this.package.keywords || []).length > 0;

    // this.themeLink = this._getLink('theme');
    // this.familyLink = this._getLink('family');
    // this.specificLink = this._getLink('specific');

    let children = this.$.install.children;
    for( var i = 0; i < children.length; i++ ) {
      children[i].style.display = 'none';
    }
    if( this.$[`install-${this.package.language}`] ) {
      this.$[`install-${this.package.language}`].style.display = 'block';
    }

    // below is write access rendering
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

  _createThemeLinks(attr) {
    let values = this.package[attr];
    if( !values ) return [];
    if( !Array.isArray(values) ) values = [values];

    return values.map(val => {
      return {
        value : val,
        link : this._getLink(attr, val)
      }
    })
  }

  render() {
    if( !this.package ) return;
    this.$.readmeSm.render(this.package.description, null, this.package.name);
    this.$.readmeLg.render(this.package.description, null, this.package.name);
  }

}

customElements.define('app-landing-page', AppLandingPage);