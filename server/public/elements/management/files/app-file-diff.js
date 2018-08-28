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
      },
      status : {
        type : String,
        value : ''
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
    this.saving = false;
  }

  _cancel() {
    this.saving = false;
    this.hide();
  }

  hide() {
    this.$.popup.close();
  }

  _save() {
    this._upload();
  }

  _upload() {
    this.saving = true;
    this.status = 'Committing changes ...';

    var formData = new FormData();
    var request = new XMLHttpRequest();
    request.open('POST', `/api/package/${this.packageId}/updateFiles`);
    

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

  
    request.onload = (e) => {     
      console.log('Request Status', e);
      if( request.status === 200 ) {
        let files = JSON.parse(request.response);
        files.forEach(file => PackageModel.store.onFileLoaded(this.packageId, file));
      } else {
        alert('Upload Error: '+request.response);
      }

      this.saving = false;
      this.hide();
    };
    request.onprogress = (e) => {
      let p = Math.ceil((e.loaded / e.total) * 100);
      if( p < 100 ) this.status = `Uploading ${p}% ...`;
      else this.status = 'Committing changes ...';
    };

    request.send(formData);
  }
}

customElements.define('app-file-diff', AppFileDiff);