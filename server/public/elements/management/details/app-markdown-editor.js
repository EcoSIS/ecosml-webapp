import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-markdown-editor.html"

import PackageInterface from "../../interfaces/PackageInterface";
import "../../utils/app-markdown"

export default class AppMarkdownEditor extends Mixin(PolymerElement)
  .with(EventInterface, PackageInterface) {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      selected : {
        type : String,
        value : 'input',
        observer : '_onSelectedChange'
      },
      previewMode : {
        type : Boolean,
        value : false
      },
      label : {
        type : String,
        value : ''
      }
    }
  }

  get value() {
    return this.$.input.value;
  }

  set value(value) {
    this.$.input.value = value;
    this.autoSize();
    if( this.previewMode ) this._updatePreview();
  }

  _triggerChangeEvent() {
    this.dispatchEvent(new CustomEvent('markdown-change', {detail: this.value}));
  }

  /**
   * Called by observer
   */
  _onSelectedChange() {
    if( this.selected === 'input' ) {
      this.previewMode = false;
    } else {
      this.previewMode = true;
    }
  }

  /**
   * @method _toggle
   * @description bound to paper-button click event
   */
  _toggle(e) {
    if( e.currentTarget.getAttribute('data') === 'edit' ) {
      this.selected = 'input';
      this.autoSize();
    } else {
      let height = this.$.input.offsetHeight;
      this.selected = 'preview';
      this._updatePreview(height);
    }
  }

  /**
   * @method _updatePreview
   * @description update markdown preview
   * 
   * @param {Number} height optional
   */
  async _updatePreview(height) {
    this.$.preview.render(this.value, height);
  }

  /**
   * @method _onTextAreaKeyUp
   * @description bound to textarea keyup events
   */
  _onTextAreaKeyUp() {
    this.autoSize();
  }

  /**
   * @method autoSize
   * @description ensure the input textarea has no scroll bar.  ie
   * is same height as text
   */
  autoSize() {
    setTimeout(() => {
      this.$.input.style.height = (this.$.input.scrollHeight) + 'px';
    }, 0);
    setTimeout(() => {
      this.$.input.style.height = (this.$.input.scrollHeight) + 'px';
    }, 100);
  }


}

customElements.define('app-markdown-editor', AppMarkdownEditor);