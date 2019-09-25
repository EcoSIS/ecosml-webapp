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
    return {}
  }

  constructor() {
    super();
    this.active = true;
  }

}

customElements.define('app-package-search', AppPackageSearch);