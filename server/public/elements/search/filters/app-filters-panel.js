import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import template from "./app-filters-panel.html"
import SearchInterface from "../../interfaces/SearchInterface"
import "./app-filter-panel"

export default class AppFiltersPanel extends Mixin(PolymerElement)
  .with(EventInterface, SearchInterface) {

  static get template() {
    return template;
  }

  static get properties() {
    return {
      filters : {
        type : Array,
        value : () => []
      },
      hasFilters : {
        type : Boolean,
        value : true
      }
    }
  }

  constructor() {
    super();
    this.active = true;
  }

  /**
   * @method _onSearchPackagesUpdate
   * @description from SearchInterface, called when search state updates
   */
  _onSearchPackagesUpdate(e) {
    if( e.state !== 'loaded' ) return;
    let filters = e.payload.filters || {};

    let arr = [];
    for( var key in filters ) {
      arr.push({
        key : key,
        values : filters[key]
      });
    }

    this.filters = arr;
    this.hasFilters = (this.filters.length > 0);
  }
}

customElements.define('app-filters-panel', AppFiltersPanel);