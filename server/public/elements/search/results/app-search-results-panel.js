import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import template from "./app-search-results-panel.html"
import SearchInterface from "../../interfaces/SearchInterface"
import "./app-search-result"
import "../app-search-pagination"

export default class AppSearchResultsPanel extends Mixin(PolymerElement)
  .with(EventInterface, SearchInterface) {

  static get template() {
    return template;
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
      results : {
        type : Array,
        value : () => []
      },
      hasResults : {
        type : Boolean,
        value : true
      }
    }
  }

  constructor() {
    super();
    this.active = true;
  }

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
    this.hasResults = (this.results.length > 0);
  }

}

customElements.define('app-search-results-panel', AppSearchResultsPanel);