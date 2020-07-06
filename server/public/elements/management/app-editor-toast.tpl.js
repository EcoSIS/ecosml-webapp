import { html } from 'lit-element';
import {litCss, sharedStylesHtml} from 'ecosis-client-commons'

export default function render() { 
return html`

${litCss(sharedStylesHtml)}
<style>
  :host {
    display: block;
  }

  #unsavedMsg paper-button {
    color: var(--inverse-text-color);
    border: 1px solid var(--inverse-text-color);
  }
  
  #unsavedMsg paper-button:hover {
    color: var(--default-primary-color);
    border: 1px solid var(--default-primary-color);
  }

  #savedToast {
    --paper-toast-background-color: var(--default-primary-color);
    --paper-toast-color: var(--inverse-text-color);
  }

  #commitMsg {
    display: block;
    width: 100%;
    box-sizing: border-box;
    margin-top: 20px;
  }
</style>

<paper-toast id="savingToast" duration="0">
  <div id="unsavedMsg">
    <div>
      You have unsaved changes  
      <paper-button @click="${this._onSaveChangesClicked}">Commit Changes</paper-button> 
    </div> 
    <div>
      <input type="text" placeholder="Commit message" id="commitMsg">
    </div>
  </div>
  <div id="savingMsg">
    Committing...
  </div>
</paper-toast>

<paper-toast id="savedToast">
  Package Data Saved!
</paper-toast>

`;}