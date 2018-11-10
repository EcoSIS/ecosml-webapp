import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-created-popup.html"

export default class AppCreatedPopup extends PolymerElement {

  static get properties() {
    return {
      githubOrg : {
        type : String,
        value : APP_CONFIG.env.github
      },
      name : {
        type : String,
        value : ''
      }
    }
  }

  static get template() {
    return html([template]);
  }

  connectedCallback() {
    super.connectedCallback();

    if( !this._init ) {
      this._init = true;
      (this.parentElement || this.parentNode).removeChild(this);
      document.body.appendChild(this);
    }
  }

  _cancel() {
    this.close();
  }

  close() {
    this.$.popup.close();
  }

  open() {
    this.$.popup.open();
  }

}

customElements.define('app-created-popup', AppCreatedPopup);