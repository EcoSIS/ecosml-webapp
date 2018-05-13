import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-user-icon.html"

export default class AppUserIcon extends PolymerElement {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      size: {
        type : Number,
        value : 24,
        observer : '_setSize'
      },
      active : {
        type : Boolean,
        value : false
      }
    }
  }

  _setSize() {
    if( !this.size ) return;
    this.updateStyles({
      '--user-icon-size': this.size+'px',
    });
  }

}

customElements.define('app-user-icon', AppUserIcon);