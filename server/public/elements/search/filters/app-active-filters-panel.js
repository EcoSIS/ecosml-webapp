import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-active-filters-panel.html"
import SearchInterface from "../../interfaces/SearchInterface"

export default class AppActiveFiltersPanel extends Mixin(PolymerElement)
  .with(EventInterface, SearchInterface) {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      filters : {
        type : Array,
        value : () => []
      },
      hasFilters : {
        type : Boolean,
        value : false
      },
      isSearch : {
        type : Boolean,
        value : false
      }
    }
  }

  constructor() {
    super();
    this._injectModel('AppStateModel');
  }

  _onAppStateUpdate(e) {
    if( e.location.path.length && e.location.path[0] === 'search' ) {
      this.isSearch = true;
      return;
    }
    this.isSearch = false;
  }

  _onSearchPackagesUpdate(e) {
    if( e.state !== 'loaded' ) return;
    this.filters = e.query.filters.map(filter => {
      let key = Object.keys(filter)[0];
      return {
        key, value : filter[key]
      }
    });

    this.hasFilters = (this.filters.length > 0);
  }

  _onRemoveFilterClicked(e) {
    let index = parseInt(e.currentTarget.getAttribute('index'));
    let filter = this.filters[index];
    this._removeSearchFilter(filter.key, filter.value);
    this._searchPackages();
  }


}

customElements.define('app-active-filters-panel', AppActiveFiltersPanel);