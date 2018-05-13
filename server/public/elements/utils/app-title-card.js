import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-title-card.html"

export class AppTitleCard extends PolymerElement {
  static get template() {
    return html([template]);
  }
}

customElements.define('app-title-card', AppTitleCard);