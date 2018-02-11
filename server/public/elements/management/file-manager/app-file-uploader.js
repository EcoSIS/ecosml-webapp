import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import template from "./app-file-uploader.html"

import "@polymer/paper-progress/paper-progress"
import PackageInterface from "../../interfaces/PackageInterface"

export default class AppFileUploader extends Mixin(PolymerElement)
  .with(EventInterface, PackageInterface) {

  static get template() {
    return template;
  }

  static get properties() {
    return {
      data : {
        type : Object,
        value : () => {},
        observer : '_onDataUpdate'
      },
      uploading : {
        type : Boolean,
        value : true
      },

      // should be 0 - 100
      uploadPercent : {
        type : Number,
        value : 0
      }
    }
  }


  /**
   * @method _onDataUpdate
   * @description fired from the data attribute observer
   */
  _onDataUpdate() {
    if( !this.data ) return;
  }

  /**
   * @method _onRemoveClicked
   * @description fired when the close icon button is clicked
   */
  async _onRemoveClicked() {
    try {
      if( this.uploading ) await this.cancel();
      else await this.remove();

      this.fire('file-removed', this.data);
    } catch(e) {
      // TODO: handle
    }
  }

  /**
   * @method cancel
   * @description cancel a file while it's uploading
   */
  cancel() {

  }

  /**
   * @method remove
   * @description remove a file from the repository
   */
  remove() {

  }

}

customElements.define('app-file-uploader', AppFileUploader);