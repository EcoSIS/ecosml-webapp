import { LitElement } from 'lit-element';
import render from "./app-admin.tpl.js"

import "./doi/app-doi-admin"

// this is just a placeholder for if we get more admin functionality
export default class AppAdmin extends Mixin(LitElement)
  .with(LitCorkUtils) {

  static get properties() {
    return {
      subPage : {type: String}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);

    this._injectModel('AppStateModel');

    // static for now
    this.subPage = 'doi';
  }

}

customElements.define('app-admin', AppAdmin);
