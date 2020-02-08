import { LitElement } from 'lit-element';
import render from "./app-doi-edit-panel.tpl.js"


export default class AppDoiEditPanel extends Mixin(LitElement)
  .with(LitCorkUtils) {

  static get properties() {
    return {
      data : {type: Object},
      showUpdate : {type: Boolean}
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

    this._injectModel('DoiModel');
  }

  updated(props) {
    if( props.has('data') ) {
      if( this.data.state === 'pending-approval' || 
          this.data.state === 'pending-revision' ) {
        this.showUpdate = true;
      } else {
        this.showUpdate = false;
      }
    }
  }

  /**
   * @method setDoiState
   * @description for given doi (data object), set and save the 
   * new doi state.  Then set the returned doi object back to data.
   * 
   * @param {String} state 
   */
  setDoiState(state) {

  }


}

customElements.define('app-doi-edit-panel', AppDoiEditPanel);
