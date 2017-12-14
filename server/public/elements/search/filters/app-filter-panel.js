import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import template from "./app-filter-panel.html"
import SearchInterface from "../../interfaces/SearchInterface"
import "./app-filter-checkbox"

export default class AppFilterPanel extends Mixin(PolymerElement)
  .with(EventInterface, SearchInterface) {

  static get template() {
    return template;
  }

  static get properties() {
    return {
      filter : {
        type : Object,
        value : () => {},
        observer : '_onFilterUpdate'
      },
      activeFilters : {
        type : Array,
        value : () => []
      },
      hasActiveFilters : {
        type : Boolean,
        value : false
      }
    }
  }

  constructor() {
    super();
    this.active = true;
  }

  _onFilterUpdate() {
    // console.log(this.filter);
  }

  /**
   * @method _onFilterClicked
   * @private
   * @description fired when app-filter-checkbox is clicked by user
   */
  _onFilterClicked(e) {
    if( e.detail.checked ) {
      this._appendSearchFilter(this.filter.key, e.detail.filter);
    } else {
      this._removeSearchFilter(this.filter.key, e.detail.filter);
    }
    this._searchPackages();
  }

  _onSearchPackagesUpdate(e) {
    if( e.state !== 'loaded' ) return;
    this.activeFilters = e.query.filters.reduce((arr, filter) => {
      if( filter[this.filter.key] ) arr.push({filter: filter[this.filter.key], count: ''});
      return arr;
    }, []);

    this.hasActiveFilters = (this.activeFilters.length > 0);
  }


}

customElements.define('app-filter-panel', AppFilterPanel);