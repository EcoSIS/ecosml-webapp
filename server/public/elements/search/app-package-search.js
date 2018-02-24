import {Element as PolymerElement} from "@polymer/polymer/polymer-element"

import template from "./app-package-search.html"

import "./app-search-header"
import "./filters/app-filters-panel"
import "./results/app-search-results-panel"

import SearchInterface from "../interfaces/SearchInterface"
import AppStateInterface from "../interfaces/AppStateInterface"


class AppPackageSearch extends Mixin(PolymerElement)
      .with(EventInterface, AppStateInterface, SearchInterface) {

  static get template() {
    return template;
  }

  static get properties() {
    return {
      appState : {
        type : Object,
        value : {}
      }
    }
  }

  constructor() {
    super();
    this.active = true;
  }

  /**
   * @description AppStateInterface, fired when state updates
   * @param {*} e 
   */
  _onAppStateUpdate(e) {
    this.appState = e;

    if( e.location.path[0] !== 'search' ) return;
    this._searchFromAppState();
  }

  /**
   * @method _searchFromAppState
   * @description use current app state to preform a search, should be called on first load
   * or if state update event is from popup state (forward, back button hit)
   */
  _searchFromAppState() {
    let searchUrlParts = this.appState.location.path;
    let query;
    if( searchUrlParts.length > 1 ) {
      query = this._urlToSearchQuery(searchUrlParts.slice(1, searchUrlParts.length));
    } else {
      query = this._getEmptySearchQuery();
    }

    // flag queries that came from the url hash updating
    query.fromUrl = true;
    this._searchPackages(query);
  }

  /**
   * @method _onSearchPackagesUpdate
   * @description SearchInterface, fired when search query updates.
   * used to set the window url
   * 
   */
  _onSearchPackagesUpdate(e) {
    if( !e.query || e.state !== 'loading' ) return;
    if( e.query.fromUrl ) return;

    this._setWindowLocation(this._searchQueryToUrl(e.query));
  }

}

customElements.define('app-package-search', AppPackageSearch);