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

  table {
    background-color: white;
    border-radius: 6px;
    width: 100%;
    border-collapse: collapse;
  }
  table th {
    text-align: left;
  }
  table td {
    padding: 5px;
  }
  table tr:nth-child(odd) {
    background-color: #f8f8f8
  }
  table tr:first-child {
    background-color: transparent;
  }

  paper-icon-button {
    color: var(--default-primary-color);
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

<h2>Admin DOI</h2>


<iron-pages selected="${this.panel}" attr-for-selected="panel">
  <div panel="search">
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
          <option value="canceled">Canceled</option>
        </select>
      </div>

      <div class="input-layout">
        <input type="text" id="text-filter" placeholder="Search Text" @keyup="${this._onKeyup}" />
      </div>

      <button @click="${this._onSearchClicked}">Search</button>
    </div>

    <div class="main-panel">
      <table>
        <tr>
          <th>Repository</th>
          <th>Status</th>
          <th>DOI</th>
          <th></th>
        </tr>
        ${this.items.map((result, index) => {
          return html`<tr>
            <td>
              <div><a href="/package/${result.package.name}" target="_blank">${result.package.name} ${result.tag}</a></div>
              <div class="help">${result.package.overview}</div>
            </td>
            <td>${result.state}</td>
            <td>${result.doi}</td>
            <td><paper-icon-button 
              icon="create" 
              index="${index}"
              @click="${this._onEditClicked}">
              </paper-icon-button>
            </td>
          </tr>`
        })}
      </table>
    </div>
  </div>

  <div panel="edit">
    <app-doi-edit-panel @back="${this._onEditPanelBack}"></app-doi-edit-panel>
  </div>
</iron-pages>
`;}