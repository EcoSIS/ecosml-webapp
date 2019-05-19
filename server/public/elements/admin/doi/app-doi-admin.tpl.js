import { html } from 'lit-element';
import litCss from '../../styles/lit-css'
import sharedStyles from '../../styles/shared-styles.html'

export default function render() { 
return html`

${litCss(sharedStyles)}
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
    <select style="width:150px">
      <option></option>
      <option value="pending">Pending Approval</option>
      <option value="revision">Denied, Waiting For Revision</option>
      <option value="creating">Approved, Waiting for DOI</option>
      <option value="created">Approved, DOI Assigned</option>
    </select>
  </div>

  <div class="input-layout">
    <input type="text" id="text-filter" placeholder="Search" />
  </div>
</div>

<table>
  <tr>
    <th>Repository</th>
    <th>Status</th>
    <th>DOI</th>
  </tr>
  ${this.items.map(result => {
    return html`<tr>
      <td><a href="${result.url}" target="_blank">${result.name}</a></td>
      <td>${result.status}</td>
      <td>${result.doi}</td>
    </tr>`
  })}
</table>

`;}