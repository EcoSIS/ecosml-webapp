import { LitElement } from 'lit-element';
import render from "./app-editor-toast.tpl.js"

import '@polymer/paper-toast'

export default class AppEditorToast extends LitElement {

  static get properties() {
    return {
      
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);
    window.toast = this;
  }

  _register(ids) {
    this.$ = {};
    ids.forEach(id => this.$[id] = this.shadowRoot.querySelector('#'+id));
  }

  firstUpdated() {
    this._register(['savingToast', 'savedToast', 'savingMsg', 'unsavedMsg', 'commitMsg']);
    this.parentNode.removeChild(this);
    document.body.appendChild(this);
  }

  _onSaveChangesClicked() {
    this.dispatchEvent(new CustomEvent('commit-clicked'));
  }

  setCommitMessage(msg) {
    this.$.commitMsg.value = msg;
  }

  getCommitMessage() {
    return this.$.commitMsg.value;
  }

  setUnsavedChanges() {
    this.$.unsavedMsg.style.display = 'block';
    this.$.savingMsg.style.display = 'none';
    this.$.savingToast.open();
  }

  setChangesSaving() {
    this.$.unsavedMsg.style.display = 'none';
    this.$.savingMsg.style.display = 'block';
  }

  setChangesSaved() {
    this.setCommitMessage('');
    this.$.savingToast.close();
    this.$.savedToast.open();
  }

  hideAll() {
    this.$.savingToast.close();
    this.$.savedToast.close();
  }

}

customElements.define('app-editor-toast', AppEditorToast);
