import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import template from "./app-title-card.html"

export class AppTitleCard extends PolymerElement {
  static get template() {
    return template;
  }
}

customElements.define('app-title-card', AppTitleCard);