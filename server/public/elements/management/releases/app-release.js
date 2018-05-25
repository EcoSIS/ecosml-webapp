import {PolymerElement, html} from "@polymer/polymer/polymer-element"
import template from "./app-release.html"

export default class AppRelease extends PolymerElement {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      release : {
        type : Object,
        value : null,
        observer : '_onReleaseUpdate'
      },
      name : {
        type : String,
        value : ''
      },
      description : {
        type : String,
        value : ''
      },
      published : {
        type : String,
        value : ''
      },
      zipballUrl : {
        type : String,
        value : ''
      }
    }
  }

  /**
   * @method _onReleaseUpdate
   * @description bound to release property
   */
  _onReleaseUpdate() {
    if( !this.release ) return;

    this.name = this.release.name || '';
    this.description = this.release.body || '';
    this.published = (this.release.publishedAt || '').replace(/T.*/, '');
    this.zipballUrl = this.release.zipballUrl;
  }

}

customElements.define('app-release', AppRelease);