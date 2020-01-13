import { html } from 'lit-element';

export default function render() { 
return html`

<style>
  :host {
    display: block;
    padding: 15px;
  }
</style>  

<iron-pages .selected="${this.subPage}" attr-for-selected="id">
  <app-doi-admin id="doi"></app-doi-admin>
</iron-pages>

`;}