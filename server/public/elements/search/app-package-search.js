import {Element as PolymerElement} from "@polymer/polymer/polymer-element"

import template from "./app-package-search.html"
import "./app-search-header"
import SearchInterface from "../interfaces/SearchInterface"

class AppPackageSearch extends Mixin(PolymerElement)
      .with(EventInterface, SearchInterface) {

  static get template() {
    return template;
  }

  constructor() {
    super();
    this.active = true;
    this._searchPackages();
  }

  _onSearchPackagesUpdate(e) {
    console.log(e);
  }

}

customElements.define('app-package-search', AppPackageSearch);