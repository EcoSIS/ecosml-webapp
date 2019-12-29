import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-filters-panel.html"

export default class AppFiltersPanel extends Mixin(PolymerElement)
  .with(EventInterface) {

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
        value : true
      }
    }
  }

  constructor() {
    super();
    this.active = true;

    this._injectModel('SearchModel', 'AppStateModel');
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
        label : key,
        values : filters[key].map(f => {
          f.label = f.filter;
          return f;
        })
      });
    }

    this.filters = arr;
    this.hasFilters = (this.filters.length > 0);
  }

  _onFilterSelected(e) {
    e = e.detail;
    let query = this.SearchModel.getQuery();
    this.SearchModel.appendFilter(e.filter, e.value.filter, query);
    this.AppStateModel.setLocation(this.SearchModel.toUrl(query));
  }
}

customElements.define('app-filters-panel', AppFiltersPanel);