import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-releases.html"
import "./app-release"

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
      package : {
        type : Object,
        value : () => ({})
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
      },
      priorReleases : {
        type : Array,
        value : () => []
      },
      hasPriorReleases : {
        type : Boolean,
        value : false
      },
      hasCurrentRelease : {
        type : Boolean,
        value : false
      },
      currentRelease : {
        type : Object,
        value : null
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
    if( !this.releases.length ) {
      this.release = '';
      this.priorReleases = [];
      this.currentRelease = null;
      this.hasCurrentRelease = false;
      this.hasPriorReleases = false;
      this._render();
      return;
    }

    let releasesInverse = this.releases.slice().reverse();

    this.hasCurrentRelease = true;
    this.currentRelease = releasesInverse.shift();

    if( releasesInverse.length ) {
      this.priorReleases = releasesInverse;
      this.hasPriorReleases = true;
    } else {
      this.priorReleases = [];
      this.hasPriorReleases = false;
    }

    this.release = this.currentRelease.name;
    this._render();
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

    let parts = this.release
      .replace(/^v/, '')
      .split('.')
      .map(r => parseInt(r));

    if( parts.length < 3 ) return;

    this.major = parts[0];
    this.minor = parts[1];
    this.patch = parts[2] + 1;
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
    let info = {
      name : `v${this.major||0}.${this.minor||0}.${this.patch||0}`,
      description : this.$.description.value
    }

    this.saving = true;
    let resp = await this._createRelease(this.package.name, info);
    this.saving = false;
    this.showList();

    if( resp.state === 'error' ) {
      alert('Error creating release: '+resp.error.message);
    } else {
      alert('Release '+info.name+' created');
    }
  }

}

customElements.define('app-releases', AppReleases);