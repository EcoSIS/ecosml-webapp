import { LitElement } from 'lit-element';
import render from "./app-doi-request.tpl.js"
import clone from "clone"

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
    this._injectModel('PackageEditor', 'DoiModel');
  }

  reset() {
    this.available = [];
    this.inProgress = [];
    this.minted = [];
    this.hasRelease = false;
  }

  _onPackageEditorDataUpdate(e) {
    if( e.state !== 'edit' ) return;
    this.reset();
    let dois = e.dois || [];

    this.packageId = e.payload.id;
    this.package = e.payload;

    this.hasRelease = e.payload.releases.length > 0;

    dois = dois.filter(doi => doi.state !== 'canceled')

    this.minted = dois.filter(doi => doi.state === 'applied').map(doi => this._transform(doi));
    this.inProgress = dois.filter(doi => doi.state !== 'applied').map(doi => this._transform(doi));
    this.available = e.payload.releases.filter(release => {
      return (dois.findIndex(doi => doi.tag === release.tagName) === -1);
    });
  }

  _transform(doi) {
    doi = clone(doi);
    doi.package = this.package;
    doi.currentStateInfo = doi.history[doi.history.length-1];
    return doi;
  }

  async _updateData() {
    let e = await this.DoiModel.get(this.packageId);
    this.PackageEditor.setDoiData(e.payload);
  }

  async _onMakeRequestClicked() {
    let tag = this.shadowRoot.querySelector('#new-doi-input').value;
    if( !confirm('Are you sure you want request a DOI for: '+tag) ) return;
    try {
      await this.DoiModel.requestDoi(this.packageId, tag);
    } catch(e) {
      alert('DOI Request Failed: '+(e.payload ? e.payload.message : e.message));
    }
    await this._updateData();
  }

  async _onCancelClicked(e) {
    let index = parseInt(e.currentTarget.getAttribute('index'));
    let doi = this.inProgress[index];
    if( !confirm('Are you sure you want cancel DOI request for: '+doi.tag) ) return;
    try {  
      await this.DoiModel.updateState('cancel', doi);
    } catch(e) {
      alert('DOI Request Failed: '+(e.payload ? e.payload.message : e.message));
    }
    await this._updateData();
  }

}

customElements.define('app-doi-request', AppDoiRequest);
