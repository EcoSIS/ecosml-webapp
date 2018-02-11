import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import template from "./app-markdown-editor.html"

import PackageInterface from "../interfaces/PackageInterface";
import "../utils/app-markdown"

export default class AppMarkdownEditor extends Mixin(PolymerElement)
  .with(EventInterface, PackageInterface) {

  static get template() {
    return template;
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
    this._autoSize();
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
   * Called by paper-icon-button toggles
   */
  _toggle(e) {
    if( e.currentTarget.icon === 'code' ) {
      this.selected = 'input';
      this._autoSize();
    } else {
      this.$.preview.style.height = this.$.input.offsetHeight+'px';
      this.selected = 'preview';
      this._updatePreview();
    }
  }

  /**
   * update markdown previeew
   */
  async _updatePreview() {
    this.$.preview.render(this.value);
  }

  _onTextAreaKeyUp() {
    this._autoSize();
  }

  _autoSize() {
    setTimeout(() => {
      this.$.input.style.height = (this.$.input.scrollHeight) + 'px';
    }, 0);
  }


}

customElements.define('app-markdown-editor', AppMarkdownEditor);