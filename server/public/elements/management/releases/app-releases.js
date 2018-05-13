import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-releases.html"

import PackageInferface from "../../interfaces/PackageInterface"

export default class AppReleases extends Mixin(PolymerElement)
  .with(EventInterface, PackageInferface) {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      releases : {
        type : Array,
        value : () => [],
        observer : '_onReleasesUpdate'
      },
      releasesInverse : {
        type : Array,
        value : () => []
      },
      package : {
        type : Object,
        value : () => {},
        observer : '_tmp'
      },
      creating : {
        type : Boolean,
        value : false
      },
      saving : {
        type : Boolean,
        value : false
      },
      release : {
        type : String,
        value : ''
      }
    }
  }

  _tmp() {
    console.log(this.package);
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
   * @method _toggleCreate
   * @description called from top right create/cancel buttons
   */
  _toggleCreate() {
    this.creating = !this.creating;

    if( this.creating ) {
      this.$.description.value = '';
      this._render();
    }
  }

  /**
   * @method showList
   * @description show the releases list
   */
  showList() {
    this.creating = false;
  }

  /**
   * @method _onReleasesUpdate
   * @description called from releases property observer
   */
  _onReleasesUpdate() {
    let index = this.releases.length-1;
    if( index === -1 ) {
      this.release = '';
      this._render();
      return;
    }

    this.releases[index].latest = true;
    this.releasesInverse = this.releases.slice().reverse();

    this.release = this.releases[index].name;
    this._render();
    this.patch++;
  }

  /**
   * @method _render
   * @description called whenever the release string updates, set the input fields
   */
  _render() {
    if( !this.release ) {
      this.major = 0;
      this.minor = 0;
      this.patch = 1;
      return;
    }

    let parts = this.release.replace(/^v/, '').split('.');
    if( parts.length < 3 ) return;

    this.major = parts[0];
    this.minor = parts[1];
    this.patch = parts[2];
  }

  /**
   * @method _onInputChange
   * @description called whenever a input field changes due to user input, set
   * the release string.
   */
  _onInputChange() {
    this.release = `v${this.major}.${this.minor}.${this.patch}`;
  }

  /**
   * @method _onCreateClicked
   * @description called when the create button is clicked
   */
  async _onCreateClicked() {
    if( !this.release ) alert('Please enter a valid release');

    let info = {
      name : `v${this.major}.${this.minor}.${this.patch}`,
      description : this.$.description.value
    }

    try {
      this.saving = true;
      await this._createRelease(this.package.name, info);
      alert('Release '+info.name+' created');
      this.showList();
    } catch(e) {
      let body = await e.details.json()
      alert(body.message);
    }

    this.saving = false;
  }

}

customElements.define('app-releases', AppReleases);