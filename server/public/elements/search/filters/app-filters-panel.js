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
        type : Object,
        value : () => {},
        observer : '_onFiltersUpdate'
      },
      filters : {
        type : Array,
        value : () => []
      }
    }
  }

  constructor() {
    super();
    this.active = true;
  }

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
  }



}

customElements.define('app-filters-panel', AppFiltersPanel);