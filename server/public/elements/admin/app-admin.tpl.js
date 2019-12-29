import { html } from 'lit-element';

export default function render() { 
return html`

<style>
  :host {
    display: block;
  }
</style>  


<iron-pages .selected="${this.subPage}" attr-for-selected="id">
  <app-doi-admin id="doi"></app-doi-admin>
</iron-pages>

`;}