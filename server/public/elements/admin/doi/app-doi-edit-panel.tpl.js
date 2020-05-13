import { html } from 'lit-element';
import {litCss, sharedStylesHtml} from 'ecosis-client-commons'

export default function render() { 
return html`

${litCss(sharedStylesHtml)}
<style>
  :host {
    display: block;
  }
  .sub-heading {
    margin-top: 20px;
    font-weight: bold;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  table tr[even] {
    background-color: #f8f8f8;
  }
  table td {
    padding: 5px;
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

  span.pre {
    font-weight: bold;
  }
</style>  


<div class="main-panel">
  <h2 style="margin-top:0"><a href="/package/${this.data.package.id}" target="_blank">${this.data.package.name}</a></h2>
  <div>${this.data.tag}</div>
  <div class="help">${this.data.package.overview}</div>

  <h3><b>Current State:</b> ${this.data.state}</h3>
  <div class="layout" ?hidden="${!this.showUpdate}">
    Action: 
    <select id="state-input" style="width:150px" @change="${this._onStateInputChange}">
      <option></option>
      <option value="request-revision">Request Revision</option>
      <option value="approve">Approve</option>
      <!-- <option value="cancel">Cancel</option> -->
    </select>
    <button @click="${this._onUpdateStateClicked}">Update</button>
  </div>

  <div ?hidden="${!this.showMessageInput}">
    <h2>Message</h2>
    <textarea id="message-input"></textarea>
  </div>

  <div class="sub-heading" style="margin-bottom: 15px">History</div>
  <table>
  ${this.data.history.map((item, index) => html`
    <tr ?even="${index % 2 === 0}">
      <td>
        <div>
          <span class="pre">${item.admin ? 'Admin' : 'Requested By'}:</span> ${item.admin || this.data.requestedBy}
        </div>
        <div ?hidden="${!item.requestedByEmail}">
          <span class="pre">Email:</span> ${item.requestedByEmail || ''}
        </div>
      </td>
      <td>${item.state}</td>
      <td>${new Date(item.timestamp).toISOString().split('T').join(' ')}</td>
    </tr>
    <tr ?hidden="${!item.message}" ?even="${index % 2 === 0}">
      <td colspan="3">
        <span class="pre">Message:</span> ${item.message}
      </td>
    </tr>
  `)}
  </table>

  <div ?hidden="${!this.data.doi}">
    <div class="sub-heading">DOI</div>
    <div>${this.data.doi}</div>
  </div>
</div>

<div style="margin: 25px">
  <a @click="${this.back}">
    <iron-icon icon="arrow-back"></iron-icon> Back
  </a>
</div>

`;}