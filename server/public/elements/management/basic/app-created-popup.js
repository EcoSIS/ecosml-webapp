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
      },
      defaultBranch : {
        type : String,
        value : 'master'
      }
    }
  }

  static get template() {
    return html([template]);
  }

  _cancel() {
    this.close();
  }

  close() {
    this.dispatchEvent(new CustomEvent('close'));
  }

}

customElements.define('app-created-popup', AppCreatedPopup);