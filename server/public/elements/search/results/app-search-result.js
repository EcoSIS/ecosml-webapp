import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import template from "./app-search-result.html"

export default class AppSearchResult extends PolymerElement {

  static get template() {
    return template;
  }

  static get properties() {
    return {
      item : {
        type : Object,
        value : () => {},
        observer : '_onItemUpdate'
      },

      latestRelease : {
        type : String,
        value : ''
      }
    }
  }

  /**
   * @method _onItemUpdate
   * @description called when item property updates
   */
  _onItemUpdate() {
    if( !this.item ) return;

    if( this.item.releases.length === 0 ) {
      return this.latestRelease = 'No releases';
    }

    this.latestRelease = this.item.releases[this.item.releases.length-1].name;
  }

}

customElements.define('app-search-result', AppSearchResult);