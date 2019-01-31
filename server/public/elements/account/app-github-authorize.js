import {PolymerElement, html} from "@polymer/polymer"
import template from "./app-github-authorize.html"

import "@polymer/paper-button"

export default class AppGithubAuthorize extends Mixin(PolymerElement)
  .with(EventInterface) {

  static get template() {
    return html([template]);
  }

  static get properties() {
    return {
      linked : {
        type : Boolean,
        value : false
      },

      githubUsername : {
        type : String,
        value : ''
      },

      githubAvatar : {
        type : String,
        value : ''
      }
    }
  }

  constructor() {
    super();
    this._injectModel('AuthModel');
  }

  ready() {
    super.ready();
    if( APP_CONFIG.github.username ) {
      this.linked = true;
      this.githubUsername = APP_CONFIG.github.username;
      this.githubAvatar = APP_CONFIG.github.data.avatarUrl;
    }
  }

  _onAuthUpdate(e) {
    // console.log(e);
  }

  /**
   * @method _onAuthorizeClicked
   * @description bound to click event on authorize github button
   */
  _onAuthorizeClicked() {
    this.AuthModel.authorizeGithub();
  }

  /**
   * @method _onRevokeClicked
   * @description bound to click event on revoke github button
   */
  _onRevokeClicked() {
    if( !confirm('Are you sure you want to unlink your EcoSIS and GitHub accounts? '+
    'You will lose access to EcoSML managed GitHub repositories via the GitHub website and git CLI') ) return;
    this.AuthModel.revokeGithub();
  }

}

customElements.define('app-github-authorize', AppGithubAuthorize);