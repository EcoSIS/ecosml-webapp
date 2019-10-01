import {PolymerElement, html} from "@polymer/polymer"

import template from "./app-package-search.html"

import "./ecosml-search-header"
import "./filters/app-filters-panel"
import "./results/app-search-results-panel"

class AppPackageSearch extends Mixin(PolymerElement)
      .with(EventInterface) {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      mobileFiltersOpen : {
        type : Boolean,
        value : false
      }
    }
  }

  constructor() {
    super();
    this.active = true;

    window.addEventListener('resize', () => {
      let w = window.innerWidth;
      if( this.mobileFiltersOpen && w > 768 ) this.mobileFiltersOpen = false;
    });
  }

  /**
   * @method _toggleMobileFilters
   * @description bound to click events on filter button.  toggles to mobile 
   * filter state
   */
  _toggleMobileFilters() {
    this.mobileFiltersOpen = !this.mobileFiltersOpen;
  }

}

customElements.define('app-package-search', AppPackageSearch);