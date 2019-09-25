import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-search-header.html"
import AppStateInterface from "../interfaces/AppStateInterface"
import SearchInterface from "../interfaces/SearchInterface"
import "./filters/app-active-filters-panel"

export default class AppSearchHeader extends Mixin(PolymerElement)
  .with(EventInterface, AppStateInterface, SearchInterface) {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      
    }
  }

  constructor() {
    super();
    this.active = true;
  }

  /**
   * @method _onButtonClick
   * @description called from search button
   */
  _onButtonClick() {
    this._search();
  }

  /**
   * @method _onKeyPress
   * @description called from text input
   */
  _onKeyPress(e) {
    if( e.which !== 13 ) return;
    this._search();
  }

  /**
   * @method _search
   * @description run a new search with text from text input.
   * make sure url is pointed at /search
   */
  _search() {
    this._setSearchText(this.$.input.value);
    this._searchPackages();
    this._setWindowLocation('/search');
  }

  /**
   * @method _onSearchPackagesUpdate
   * @description from SearchInterface, called when search state updates
   */
  _onSearchPackagesUpdate(e) {
    if( !e.query || e.state !== 'loading' ) return;
    this.$.input.value = e.query.text;
  }

}

customElements.define('app-search-header', AppSearchHeader);