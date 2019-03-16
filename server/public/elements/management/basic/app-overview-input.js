import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-overview-input.html"

import "../app-text-input"

export default class AppOverviewInput extends PolymerElement {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      creating : {
        type : Boolean,
        value : false
      },
      isManagedSource : {
        type : Boolean,
        value : false
      },
      value : {
        type : String,
        value : '',
        observer : '_valueObserver'
      }
    }
  }

  /**
   * @method _overviewObserver
   * @description bound to overview property
   */
  _overviewObserver() {
    this.$.overview.value = this.value;
  }

  _onInputChange() {
    this.value = this.$.overview.value; 

    let e = new CustomEvent('change', {detail: {value: this.value}})
    this.dispatchEvent(e);
  }

}

customElements.define('app-overview-input', AppOverviewInput);