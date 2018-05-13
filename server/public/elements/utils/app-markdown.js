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

  static get template() {
    return html([`
      ${template} 
      <style>${css}</style>
      <style>${prismCss}</style>
    `]);
  }

  async render(markdown) {
    this.$.root.innerHTML = 'Rendering...';
    let {body} = await this._previewMarkdown(markdown);
    this.show(body);
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