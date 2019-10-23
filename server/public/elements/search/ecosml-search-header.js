import { LitElement } from 'lit-element';
import render from "./ecosml-search-header.tpl.js"

export default class EcosmlSearchHeader extends Mixin(LitElement)
  .with(LitCorkUtils) {

  static get properties() {
    return {
      filters : {type: Array},
      text : {type: String}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);

    this.page = 'home';
    this.filters = [];
    this.text = '';

    this._injectModel('AppStateModel', 'PackageModel', 'SearchModel');
  }


  _onAppStateUpdate(e) {
    this.page = e.page;
    let visible = (e.page === 'home' || e.page === 'search');
    this.style.display = visible ? 'block' : 'none';
  }

  /**
   * @method _onTextSearch
   * @description bound to text search event in app-search-header
   * 
   * @param {Object} e 
   */
  _onTextSearch(e) {
    let query = this.SearchModel.getQuery();
    this.SearchModel.setText(text, query);
    this.SearchModel.setOffset(0, query);
    this.AppStateModel.setLocation(this.SearchModel.toUrl(query));
  }


  /**
   * @method _onRemoveFilter
   * @description bound to remove-filter event in app-search-header
   */
  _onRemoveFilter(e) {
    let query = this.SearchModel.getQuery();
    this.SearchModel.removeFilter(e.detail.key, e.detail.value, query);
    this.AppStateModel.setLocation(this.SearchModel.toUrl(query));
  }

  /**
   * @method _onSearchPackagesUpdate
   * @description bound to SearchModel search-packages-update event
   * 
   * @param {Object} e 
   */
  _onSearchPackagesUpdate(e) {
    if( e.state !== 'loaded' ) return;
    this.text = e.query.text;
    this.filters = e.query.filters.map(filter => {
      let key = Object.keys(filter);
      if( key.length === 0 ) return filter; // badness

      return {
        label: key[0], 
        key: key[0], 
        value: filter[key[0]]
      };
    });
  }

}

customElements.define('ecosml-search-header', EcosmlSearchHeader);
