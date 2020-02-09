import { html } from 'lit-element';
import {litCss, sharedStylesHtml} from 'ecosis-client-commons'

export default function render() { 
return html`

${litCss(sharedStylesHtml)}
<style>
  :host {
    display: block;
  }

  h2 {
    border-bottom: 1px solid #ddd;
    padding-bottom: 4px;
  }

  button {
    margin: 15px 0;
    color: white;
    background: var(--light-primary-color);
    border: 1px solid var(--light-primary-color);
    height: 36px;
    padding: 0 15px;
    border-left: none;
    border-radius: 0;
  }
</style>

<div ?hidden="${this.hasRelease}">
  You must create a release before you can request a DOI.
</div>

<div ?hidden="${!this.available.length}">
  <h2>Request DOI</h2>
  <div>
    Select Tag:
    <select>
      ${this.available.map(item => html`
        <option value="${item.tagName}">${item.tagName}</option>
      `)}
    </select>
  </div>
  <div><button>Make Request</button></div>
</div>

<div ?hidden="${!this.inProgress.length}">
  <h2>In Progress</h2>
  ${this.inProgress.map(item => html`
    <div>
      <div>
        <h4 style="margin-bottom: 0">${item.tag}</h4>
        <div>Requested By: ${item.requestedBy}</div>
        <div>State: ${item.state}</div>
        <div ?hidden="${!item.currentStateInfo.message}">
          <div>Message</div>
          <div>${item.currentStateInfo.message}</div>
        </div>
      </div>
      <div>
        <button>Cancel Request</button>
      </div>
    </div>
  `)}
</div>

<div ?hidden="${!this.minted.length}">
  <h2>Applied</h2>
  ${this.minted.map(item => html`
    <div><b>${item.tag}:</b> ${item.doi}</div>
  `)}
</div>

`;}