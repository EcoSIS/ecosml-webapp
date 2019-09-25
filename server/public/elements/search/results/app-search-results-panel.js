import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-search-results-panel.html"

import SearchInterface from "../../interfaces/SearchInterface"
import AppStateInterface from "../../interfaces/AppStateInterface"

import "./app-search-result"
// import "../app-search-pagination"

export default class AppSearchResultsPanel extends Mixin(PolymerElement)
  .with(EventInterface, SearchInterface, AppStateInterface) {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      loading : {
        type : Boolean,
        value : false
      },

      hasError : {
        type : Boolean,
        value : false
      },

      hasResults : {
        type : Boolean,
        value : true
      },

      results : {
        type : Array,
        value : () => []
      },

      itemsPerPage : {
        type : Number,
        value : 10
      },

      currentIndex : {
        type : Number,
        value : 0
      },

      total : {
        type : Number,
        value : 0
      }

    }
  }

  constructor() {
    super();
    this.active = true;
  }

  /**
   * @method _onSearchPackagesUpdate
   * @description via SearchInterface, called when search state updates
   * 
   * @param {Object} e 
   */
  _onSearchPackagesUpdate(e) {
    this.hasError = false;
    this.loading = false;
    
    if( e.state === 'loading' ) {
      this.loading = true;
      return;
    } else if( e.state === 'error' ) {
      this.hasError = true;
      return;
    }

    this.results = e.payload.results;
    this.itemsPerPage = e.payload.limit;
    this.currentIndex = e.payload.offset;
    this.total = e.payload.total;
    this.hasResults = (this.results.length > 0);
  }

  /**
   * @method _onPaginationNav
   * @description bound to app-search-pagination nav event
   * 
   * @param {Object} e 
   */
  _onPaginationNav(e) {
    this._setSearchOffset(e.detail.startIndex);
    this._setWindowLocation(this._searchQueryToUrl());
  }

}

customElements.define('app-search-results-panel', AppSearchResultsPanel);