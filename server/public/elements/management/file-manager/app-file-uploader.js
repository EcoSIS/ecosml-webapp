import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import template from "./app-file-uploader.html"

export default class AppFileUploader extends PolymerElement {

  static get template() {
    return template;
  }

  static get properties() {
    return {
      
    }
  }

}

customElements.define('app-file-uploader', AppFileUploader);