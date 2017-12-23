import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import template from "./app-landing-page.html"
import { markdown } from "markdown";

import AppStateInterface from "../interfaces/AppStateInterface"
import PackageInterface from "../interfaces/PackageInterface"

export default class AppLandingPage extends Mixin(PolymerElement)
  .with(EventInterface, AppStateInterface, PackageInterface) {

  static get template() {
    return template;
  }

  static get properties() {
    return {
      package : {
        type : Object,
        value : null,
        observer : 'render'
      }
    }
  }

  constructor() {
    super();
    this.active = true;
  }

  /**
   * @method _onAppStateUpdate
   * @description from AppStateInterface, called when app state updates
   */
  async _onAppStateUpdate(e) {
    if( e.location.path[0] !== 'package' ) return;
    let pkgWrapper = await this._getPackage(e.location.path[1]);
    this.package = pkgWrapper.payload;
  }

  render() {
    if( !this.package ) return;
    this.$.readme.innerHTML = markdown.toHTML(this.package.description || '');
  }

}

customElements.define('app-landing-page', AppLandingPage);