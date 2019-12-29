import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-markdown.html"

import PackageInterface from "../interfaces/PackageInterface"

import css from "github-markdown-css/github-markdown.css"
import prismCss from "prismjs/themes/prism-okaidia.css"
import "prismjs/prism"
import "prismjs/components/prism-python"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-r"

export default class AppMarkdown extends Mixin(PolymerElement)
  .with(EventInterface, PackageInterface) {

  static get properties() {
    return {
      pkgName : {
        type : String,
        value : '',
      }
    }
  }

  static get template() {
    return html([`
      ${template} 
      <style>${css}</style>
      <style>${prismCss}</style>
    `]);
  }

  /**
   * @method render
   * @description render markdown content
   * 
   * @param {String} markdown 
   * @param {Number} height optional 
   */
  async render(markdown, height, pkgName) {
    if( height ) this.style.height = height+'px'; 

    this.$.root.innerHTML = 'Rendering...';
    let state = await this.PackageModel.previewMarkdown(markdown, pkgName || this.pkgName);
    this.show(state.payload);

    if( height ) this.style.height = 'auto'; 
  }

  show(html) {
    this.$.root.innerHTML = html;

    let eles = this.$.root.querySelectorAll('code');
    for( let i = 0; i < eles.length; i++ ) {
      Prism.highlightElement(eles[i]);
    }
  }

}

customElements.define('app-markdown', AppMarkdown);