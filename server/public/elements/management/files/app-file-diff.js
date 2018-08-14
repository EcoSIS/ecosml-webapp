import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-file-diff.html"

import "../../utils/app-popup"
import PackageModel from "../../../lib/models/PackageModel"

export default class AppFileDiff extends PolymerElement {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      files : {
        type : Array,
        value : () => []
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();

    if( !this._init ) {
      this._init = true;
      (this.parentElement || this.parentNode).removeChild(this);
      document.body.appendChild(this);
    }
  }

  show(files, packageId) {
    this.packageId = packageId;
    this.files = files;
    this.$.popup.open();
  }

  _cancel() {
    this.hide();
  }

  hide() {
    this.$.popup.close();
  }

  _save() {
    this._upload();
  }

  _upload() {
    var formData = new FormData();
    var request = new XMLHttpRequest();
    // use the form info, don't couple your JS with an end-point
    request.open('POST', `/api/package/${this.packageId}/updateFiles`);
    // want to distinguish from non-JS submits?
    request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    

    let removed = [];
    for( let i = 0; i < this.files.length; i++ ) {
      if( this.files[i].changeType === 'removed' ) {
        removed.push(this.files[i].name);
        continue;
      }
      formData.append(this.files[i].name, this.files[i].file);
    }

    // removed = new Blob([JSON.stringify(removed)], {
    //   type: 'text/plain'
    // });
    formData.append('remove', JSON.stringify(removed));

    request.send(formData);

    request.onload = (e) => {
      if( request.status === 200 ) {
        let files = JSON.parse(request.response);
        files.forEach(file => PackageModel.store.onFileLoaded(this.packageId, file));
      } else {
        alert('Upload Error: '+request.response);
      }
      this.hide();
    };
    request.onprogress = function(e) {
      console.log('Request Status', e);
  };
  }
}

customElements.define('app-file-diff', AppFileDiff);