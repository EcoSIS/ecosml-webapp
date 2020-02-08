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
  }
</style>  


<div class="main-panel">
  <h2><a href="/package/${this.data.package.name}" target="_blank">${this.data.package.name}</a></h2>
  <div>${this.data.tag}</div>
  <div class="help">${this.data.package.overview}</div>

  <h3><b>Current State:</b> ${this.data.state}</h3>
  <div class="layout" ?hidden="${!this.showUpdate}">
    <select id="type-input" style="width:150px">
      <option></option>
      <option value="pending-revision">Request Revision</option>
      <option value="requesting">Approve</option>
      <option value="canceled">Cancel</option>
    </select>
    <button @click="${this._updateState}">Update</button>
  </div>

  <div class="sub-heading">History</div>
  <table>
  ${this.data.history.map(item => html`
    <tr>
      <td>
        ${item.admin || this.data.requestedBy}
        ${item.requestedByEmail || ''}
      </td>
      <td>${item.state}</td>
      <td>${new Date(item.timestamp).toISOString().replace(/T.*/, '')}</td>
    </tr>
  `)}
  </table>

  <div ?hidden="${this.data.doi}">
    <div class="sub-heading">DOI</div>
    <div>${this.data.doi}</div>
  </div>
</div>

`;}