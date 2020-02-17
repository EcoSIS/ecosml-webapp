import { LitElement } from 'lit-element';
import render from "./app-doi-admin.tpl.js"

import "./app-doi-edit-panel"

export default class AppDoiAdmin extends Mixin(LitElement)
  .with(LitCorkUtils) {

  static get properties() {
    return {
      items : {type: Array},
      panel : {type: String}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);

    this.items = [];
    this.panel = 'search';

    this._injectModel('AppStateModel', 'DoiModel');
  }

  _onAppStateUpdate(e) {
    if( e.page === 'admin' && !this.firstRender ) {
      this.firstRender = true;
      this.search();
    }
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

  _onEditClicked(e) {
    let index = parseInt(e.currentTarget.getAttribute('index'));
    this.shadowRoot.querySelector('app-doi-edit-panel').data = this.items[index];
    this.panel = 'edit';
  }

  _onDoiUpdate(e) {
    if( e.state !== 'loaded' ) return;

    let index = this.items.findIndex(item => item.id === e.id && item.tag === e.payload.tag);
    if( index === -1 ) return;

    this.items[index].history = e.payload.history;
    this.items[index].state = e.payload.state;
    this.items[index].doi = e.payload.doi;

    this.requestUpdate();
  }

  _onEditPanelBack() {
    this.panel = 'search';
  }

}

customElements.define('app-doi-admin', AppDoiAdmin);
