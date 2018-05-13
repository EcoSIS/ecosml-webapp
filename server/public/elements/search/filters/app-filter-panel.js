import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-filter-panel.html"
import SearchInterface from "../../interfaces/SearchInterface"

export default class AppFilterPanel extends Mixin(PolymerElement)
  .with(EventInterface, SearchInterface) {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      filter : {
        type : Object,
        value : () => {},
        observer : '_onFilterUpdate'
      },
      hasFilters : {
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
    if( !this.filter ) return;
    this.hasFilters = (this.filter.values.length > 0);
    // console.log(this.filter);
  }

  /**
   * @method _onFilterClicked
   * @private
   * @description fired when app-filter-checkbox is clicked by user
   */
  _onFilterClicked(e) {
    this._appendSearchFilter(this.filter.key, e.currentTarget.getAttribute('filter'));
    this._searchPackages();
  }


}

customElements.define('app-filter-panel', AppFilterPanel);