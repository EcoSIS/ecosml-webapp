import { LitElement } from 'lit-element';
import render from "./app-doi-edit-panel.tpl.js"


export default class AppDoiEditPanel extends Mixin(LitElement)
  .with(LitCorkUtils) {

  static get properties() {
    return {
      data : {type: Object},
      showUpdate : {type: Boolean},
      showMessageInput : {type: Boolean}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.data = {
      package : {},
      history : []
    };
    this.showUpdate = true;
    this.showMessageInput = false;

    this._injectModel('DoiModel');
  }

  updated(props) {
    if( props.has('data') ) {
      this._updateInputVisibility();
    }
  }

  _updateInputVisibility() {
    if( this.data.state === 'pending-approval' || 
      this.data.state === 'pending-revision' ) {
      this.showUpdate = true;
    } else {
      this.showUpdate = false;
    }
  }

  /**
   * @method _onUpdateStateClicked
   * @description bound to update button click event
   * 
   * @param {Object} e 
   */
  async _onUpdateStateClicked(e) {
    let action = this.shadowRoot.querySelector('#state-input').value;
    if( action === '' ) return;

    if( !confirm('Are you sure you want to set this DOI request to: '+action) ) return;
    await this.setDoiState(action, this.shadowRoot.querySelector('#message-input').value);


    this.shadowRoot.querySelector('#message-input').value = '';
    this.shadowRoot.querySelector('#state-input').value = '';
    this.showMessageInput = false;
  }

  /**
   * @method setDoiState
   * @description for given doi (data object), set and save the 
   * new doi state.  Then set the returned doi object back to data.
   * 
   * @param {String} action 
   */
  async setDoiState(action, message) {
    let state = await this.DoiModel.updateState(action, this.data, message);
    if( state.error ) {
      return alert(state.error.message);
    }

    this.data.history = state.payload.history;
    this.data.state = state.payload.state;
    this.data.doi = state.payload.doi;
    
    this._updateInputVisibility();
    this.requestUpdate();
  }

  _onStateInputChange(e) {
    this.showMessageInput = (e.currentTarget.value === 'request-revision')
  }

  back() {
    this.dispatchEvent(new CustomEvent('back'));
  }


}

customElements.define('app-doi-edit-panel', AppDoiEditPanel);
