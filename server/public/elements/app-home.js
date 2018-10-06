import {PolymerElement, html} from "@polymer/polymer"
import "@polymer/polymer/lib/elements/dom-repeat"
import template from "./app-home.html"

export default class AppHome extends Mixin(PolymerElement)
  .with(EventInterface) {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      loggedIn : {
        type : Boolean,
        value : false
      },
      stats : {
        type : Object,
        value : () => {
          return {
            organizations : [],
            themes : [],
            keywords : []
          }
        }
      },
      sandbox : {
        type : Boolean,
        value : true
      },
      gitenv : {
        type : Object,
        value : () => APP_CONFIG.env.git
      }
    }
  }

  constructor() {
    super();
    this._injectModel('StatsModel');
    this._injectModel('AuthModel');
    this._injectModel('SearchModel');
  }

  async ready() {
    super.ready();

    if( APP_CONFIG.env.client === 'dev' ) {
      this.$.titleExtra.innerHTML = ' - Sandbox';
      document.title = document.title+' Sandbox'
      this.sandbox = true;
    }

    let response = await this.StatsModel.get();
    let stats = response.payload;

    stats.organizations = stats.organizations.map(org => {
      let query = this.SearchModel.getEmptyQuery();
      this.SearchModel.appendFilter('organization', org.key, query);
      return Object.assign({}, org, {link: this.SearchModel.toUrl(query)})
    });

    stats.keywords = stats.keywords.map(keyword => {
      let query = this.SearchModel.getEmptyQuery();
      this.SearchModel.appendFilter('keywords', keyword.key, query);
      return Object.assign({}, keyword, {link: this.SearchModel.toUrl(query)})
    });

    stats.themes = stats.themes.map(theme => {
      let query = this.SearchModel.getEmptyQuery();
      this.SearchModel.appendFilter('theme', theme.key, query);
      return Object.assign({}, theme, {link: this.SearchModel.toUrl(query)})
    });

    this.stats = stats;
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