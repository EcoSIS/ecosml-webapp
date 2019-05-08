import { LitElement } from 'lit-element';
import render from "./app-doi-admin.tpl.js"


export default class AppDoiAdmin extends Mixin(LitElement)
  .with(LitCorkUtils) {

  static get properties() {
    return {
      test : {type: String}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);

    this._injectModel('AppStateModel');

    this.test = 'DOI Admin';
  }

  _onAppStateUpdate(e) {
    console.log(e);
  }

}

customElements.define('app-doi-admin', AppDoiAdmin);
