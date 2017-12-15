import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import template from "./app-search-header.html"
import AppStateInterface from "../interfaces/AppStateInterface"
import SearchInterface from "../interfaces/SearchInterface"
import "./filters/app-active-filters-panel"

export default class AppSearchHeader extends Mixin(PolymerElement)
  .with(EventInterface, AppStateInterface, SearchInterface) {

  static get template() {
    return template;
  }

  static get properties() {
    return {
      
    }
  }

  _onButtonClick() {
    this._search();
  }

  _onKeyPress() {
    this._search();
  }

  _search() {
    this._setSearchText(this.$.input.value);
    this._searchPackages();
    this._setWindowLocation('/search');
  }

}

customElements.define('app-search-header', AppSearchHeader);