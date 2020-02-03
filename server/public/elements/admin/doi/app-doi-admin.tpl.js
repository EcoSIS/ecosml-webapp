import { html } from 'lit-element';
import {litCss, sharedStylesHtml} from 'ecosis-client-commons'

export default function render() { 
return html`

${litCss(sharedStylesHtml)}
<style>
  :host {
    display: block;
  }

  .filter-layout {
    display: flex;
    align-items: center;
  }

  input {
    width: 100%;
    box-sizing: border-box;
  }

  .input-layout {
    flex: 1;
    padding-right: 10px;
  }
</style>  

<h2>Admin DOI</h2>

<h4>Filters</h4>

<div class="filter-layout">
  <div>
    <select id="type-input" style="width:150px">
      <option>All</option>
      <option value="pending-approval">Pending Approval</option>
      <option value="pending-revision">Waiting For Revision</option>
      <option value="applied">Approved, DOI Assigned</option>
      <option value="accepted">Approved, Waiting for DOI</option>
      <option value="requesting">Approved, Requesting DOI</option>
      <option value="rejected">Rejected</option>
    </select>
  </div>

  <div class="input-layout">
    <input type="text" id="text-filter" placeholder="Search" @keyup="${this._onKeyup}" />
  </div>

  <button @click="${this._onSearchClicked}">Search</button>
</div>

<table>
  <tr>
    <th>Repository</th>
    <th>Status</th>
    <th>DOI</th>
    <th>History</th>
  </tr>
  ${this.items.map(result => {
    return html`<tr>
      <td>
        <div><a href="/package/${result.package.name}" target="_blank">${result.package.name} ${result.tag}</a></div>
        <div>${result.package.overview}</div>
      </td>
      <td>${result.state}</td>
      <td>${result.doi}</td>
      <td>
      ${result.history.map(item => html`
        <div>${item.admin || result.requestedBy} ${item.state} ${new Date(item.timestamp).toISOString()}</div>
      `)}
      </td>
    </tr>`
  })}
</table>

`;}