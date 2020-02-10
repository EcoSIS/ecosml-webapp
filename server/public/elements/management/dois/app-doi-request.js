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
    if( !e.dois ) return this.reset();
    if( e.dois.length === 0 ) return this.reset();

    this.packageId = e.payload.id;
    this.package = e.payload;

    this.hasRelease = e.payload.releases.length > 0;
    if( !this.hasRelease ) return this.reset();

    e.dois = e.dois.filter(doi => doi.state !== 'canceled')

    this.minted = e.dois.filter(doi => doi.state === 'applied').map(doi => this._transform(doi));
    this.inProgress = e.dois.filter(doi => doi.state !== 'applied').map(doi => this._transform(doi));
    this.available = e.payload.releases.filter(release => {
      return (e.dois.findIndex(doi => doi.tag === release.tagName) === -1);
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
    await this.DoiModel.requestDoi(this.packageId, tag);
    await this._updateData();
  }

  async _onCancelClicked(e) {
    let index = parseInt(e.currentTarget.getAttribute('index'));
    let doi = this.inProgress[index];
    if( !confirm('Are you sure you want cancel DOI request for: '+doi.tag) ) return;
    await this.DoiModel.updateState('cancel', doi);
    await this._updateData();
  }

}

customElements.define('app-doi-request', AppDoiRequest);
