import { LitElement } from 'lit-element';
import render from "./app-doi-request.tpl.js"


export default class AppDoiRequest extends Mixin(LitElement)
  .with(LitCorkUtils) {

  static get properties() {
    return {
      available : {type: Array},
      inProgress : {type: Array},
      minted : {type: Array},
      hasRelease : {type: Boolean}
    }
  }

  constructor() {
    super();
    this.render = render.bind(this);
    this.reset();
    this._injectModel('PackageEditor');
  }

  reset() {
    this.available = [];
    this.inProgress = [];
    this.minted = [];
    this.hasRelease = false;
  }

  _onPackageEditorDataUpdate(e) {
    if( e.state !== 'edit' ) return;
    if( !e.dois ) return this.reset();
    if( e.dois.length === 0 ) return this.reset();

    this.hasRelease = e.payload.releases.length > 0;
    if( !this.hasRelease ) return this.reset();


    this.minted = e.dois.filter(doi => doi.state === 'applied');
    this.inProgress = e.dois.filter(doi => doi.state !== 'applied');
    this.available = e.payload.releases.filter(release => {
      return (e.dois.findIndex(doi => doi.tag === release.tagName) === -1);
    });

    console.log(this.available, this.inProgress, this.minted);

    // look at list of releases, pull out the ones that already have doi started or applied.
    // 
  }



}

customElements.define('app-doi-request', AppDoiRequest);
