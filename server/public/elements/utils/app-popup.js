import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-popup.html"

export default class AppPopup extends PolymerElement {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      active : {
        type : Boolean,
        value : false,
        reflectToAttribute : true
      },
      noAutoMove : {
        type : Boolean,
        value : false
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();

    if( !this._init && !this.noAutoMove ) {
      this._init = true;
      (this.parentElement || this.parentNode).removeChild(this);
      document.body.appendChild(this);
    }

    window.addEventListener('keyup', (e) => {
      if( this.active && e.which === 27 ) {
        this.close();
      }
    });

    var buttons = this.querySelector('.buttons');
    if( !buttons ) return;
    buttons.style.textAlign = 'right';
    buttons.style.marginTop = '15px';
  }

  open() {
    document.body.style.overflow = 'hidden';
    this.active = true;
  }

  close() {
    document.body.style.overflow = '';
    this.active = false;
  }

}

customElements.define('app-popup', AppPopup);