import { LitElement } from 'lit-element';
import render from "./app-doi-admin.tpl.js"


export default class AppDoiAdmin extends Mixin(LitElement)
  .with(LitCorkUtils) {

  static get properties() {
    return {
      items : {Array: String}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);

    this.items = [];

    this._injectModel('AppStateModel', 'DoiModel');
  }

  _onSearchClicked() {
    this.search();
  }

  _onKeyup(e) {
    if( e.which !== 13 ) return;
    this.search();
  }

  async search() {
    let text = this.shadowRoot.querySelector('#text-filter').value;
    let type = this.shadowRoot.querySelector('#type-input').value;
    if( type === 'All' ) type = '';
    let results = await this.DoiModel.search(type, text);
    this.items = results.payload || [];
  }

}

customElements.define('app-doi-admin', AppDoiAdmin);
