import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import template from "./app-create-release.html"

export default class AppCreateRelease extends PolymerElement {

  static get template() {
    return template;
  }

  static get properties() {
    return {
      release : {
        type : String,
        value : '',
        observer : '_render'
      },
      currentRelease : {
        type : String,
        value : ''
      },
      package : {
        type : Object,
        value : () => {}
      }
    }
  }

  get major() {
    return parseInt(this.$.major.value) || 0;
  }

  set major(val) {
    this.$.major.value = val+'';
  }

  get minor() {
    return parseInt(this.$.minor.value) || 0;
  }

  set minor(val) {
    this.$.minor.value = val+'';
  }

  get patch() {
    return parseInt(this.$.patch.value) || 0;
  }

  set patch(val) {
    this.$.patch.value = val+'';
  }

  /**
   * @method _render
   * @description called whenever the release string updates, set the input fields
   */
  _render() {
    if( !this.release ) {
      this.major = 0;
      this.minor = 0;
      this.patch = 0;
      return;
    }

    let parts = this.release.replace(/^v/, '').split('.');
    if( parts.length < 3 ) return;

    this.major = parts[0];
    this.manor = parts[1];
    this.patch = parts[2];
  }

  /**
   * @method _onInputChange
   * @description called whenever a input field changes due to user input, set
   * the release string.
   */
  _onInputChange() {
    this.release = `${this.major}.${this.minor}.${this.patch}`;
  }

}

customElements.define('app-create-release', AppCreateRelease);