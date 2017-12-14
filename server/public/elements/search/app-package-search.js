import {Element as PolymerElement} from "@polymer/polymer/polymer-element"

import template from "./app-package-search.html"
import "./app-search-header"
import "./filters/app-filters-panel"
import "./results/app-search-results-panel"
import SearchInterface from "../interfaces/SearchInterface"


class AppPackageSearch extends Mixin(PolymerElement)
      .with(EventInterface, SearchInterface) {

  static get template() {
    return template;
  }

  constructor() {
    super();
    this.active = true;
    this._searchPackages();
  }

  /**
   * @description AppStateInterface, fired when state updates
   * @param {*} e 
   */
  _onAppStateUpdate(e) {
    this.appState = e;

    if( e.location.path[0] === 'search' && e.location.popstate ) {
      this._searchFromAppState();
    }
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
      query = this._getAppSearchDocument();
    }

    this._searchPackages(query);
  }


  _onSearchPackagesUpdate(e) {
    console.log(e);
  }

}

customElements.define('app-package-search', AppPackageSearch);