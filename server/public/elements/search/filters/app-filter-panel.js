import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import template from "./app-filter-panel.html"
import SearchInterface from "../../interfaces/SearchInterface"
import "./app-filter-checkbox"

export default class AppFilterPanel extends Mixin(PolymerElement)
  .with(EventInterface, SearchInterface) {

  static get template() {
    return template;
  }

  static get properties() {
    return {
      filter : {
        type : Object,
        value : {},
        observer : '_onFilterUpdate'
      },
      hasActiveFilters : {
        type : Boolean,
        value : false
      }
    }
  }

  _onFilterUpdate() {
    // console.log(this.filter);
  }

  /**
   * @method _onFilterClicked
   * @private
   * @description fired when app-filter-checkbox is clicked by user
   */
  _onFilterClicked(e) {
    
  }

}

customElements.define('app-filter-panel', AppFilterPanel);