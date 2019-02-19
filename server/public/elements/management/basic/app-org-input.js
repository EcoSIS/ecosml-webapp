import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-org-input.html"

import AuthInterface from "../../interfaces/AuthInterface";

export default class AppOrgInput extends Mixin(PolymerElement)
  .with(EventInterface, AuthInterface) {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      orgs : {
        type : Array,
        value : () => []
      },
      selectedOrg : {
        type : String,
        value : ''
      }
    }
  }

  constructor() {
    super();
    this.active = true;
  }

  /**
   * @method _onOrgsUpdate
   * @description from AuthInterface, called when user orgs update
   */
  _onOrgsUpdate(e) {
    if( e.state !== 'loaded' ) return;
    this.orgs = e.payload;

    requestAnimationFrame(() => {
      this.$.input.value = this.selectedOrg;
    });
  }

  /**
   * @method _onInputChange
   * @description bound to select element, fired on change
   */
  _onInputChange() {
    this.selectedOrg = this.$.input.value;
    this.fire('change');
  }

  get value() {
    return this.selectedOrg;
  }

  set value(val) {
    this.selectedOrg = val;
    this.$.input.value = val;
  }

}

customElements.define('app-org-input', AppOrgInput);