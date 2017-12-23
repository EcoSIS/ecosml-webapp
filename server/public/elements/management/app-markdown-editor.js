import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import template from "./app-markdown-editor.html"
// import "markdown"
import { markdown } from "markdown";

export default class AppMarkdownEditor extends PolymerElement {

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
    } else {
      this.$.preview.style.height = this.$.input.offsetHeight+'px';
      this.selected = 'preview';
      this._updatePreview();
    }
  }

  /**
   * update markdown previeew
   */
  _updatePreview() {
    this.$.preview.innerHTML = markdown.toHTML(this.value);
  }

}

customElements.define('app-markdown-editor', AppMarkdownEditor);