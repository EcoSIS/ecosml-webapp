import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import template from "./app-search-header.html"
import AppStateInterface from "../interfaces/AppStateInterface"

export default class AppSearchHeader extends Mixin(PolymerElement)
  .with(EventInterface, AppStateInterface) {

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
    this._setWindowLocation('/search');
  }

}

customElements.define('app-search-header', AppSearchHeader);