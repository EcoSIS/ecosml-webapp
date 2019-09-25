import { html } from 'lit-element';

export default function render() { 
return html`

<style>
  :host {
    display: block;
  }
</style>  

<app-search-header
  .text="${this.text}"
  .filters="${this.filters}"
  @keyup="${this._onInputKeyup}"
  @text-search="${this._onTextSearch}"
  @remove-filter="${this._onRemoveFilter}">
</app-search-header>

`;}