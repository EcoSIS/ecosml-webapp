const {AppStateModel} = require('@ucd-lib/cork-app-state');
var AppStateStore = require('../stores/AppStateStore');
const PackageModel = require('../models/PackageModel');
const jsonldTransform = require('../../../lib/jsonld');

class AppStateModelImpl extends AppStateModel {

  constructor() {
    super();
    this.store = AppStateStore;

    // check for client testing flag
    let qs = parseQs();
    if( qs['integration-testing'] ) {
      window.INTEGRATION_TESTING = {};
    }

    this.seoPackageId = '';
    this.analyticsLocation = '';
  }

  async set(state) {
    if( state.location &&
      state.location.path &&
      state.location.path.length ) {
      state.page = state.location.path[0]; 
    }

    if( !state.page ) state.page = 'home';

    if( state.page === 'create' ) state.page = 'edit';
    if( (state.page === 'edit' || state.page === 'package') &&
        state.location.path.length > 1 ) {
      state.selectedPackageId = state.location.path[1];
    } else {
      state.selectedPackageId = '';
    }

    if( state.page === 'admin' ) {
      if( !APP_CONFIG.user ) {
        return this.setLocation('/');
      } else if( !APP_CONFIG.admin ) {
        return this.setLocation('/');
      } 
    }

    this.seo(state);
    this.analytics(state);
    super.set(state);
  }

  analytics(state) {
    if( window.gtag === undefined ) return;
    if( APP_CONFIG.googleAnalyticsKey === undefined ) return;
    if( this.analyticsLocation === state.location.pathname ) return;
    this.analyticsLocation = state.location.pathname;
    gtag('config', APP_CONFIG.googleAnalyticsKey, {'page_path': state.location.pathname});
  }

  async seo(state) {
    let p = state.location.path || [];

    if( p.length >= 2 && p[0] === 'package' ) {
      
      if( p[1] !== this.seoPackageId ) {
        let pkg = await PackageModel.get(p[1]);
        pkg = JSON.stringify(jsonldTransform(pkg.payload), '  ', '  ');
        this.seoPackageId = p[1];
        document.querySelector('#jsonld').innerHTML = pkg;
      }
    } else {
      this.seoPackageId = '';
      document.querySelector('#jsonld').innerHTML = '';
    }
  }

}

function parseQs(url) {
  if(!url) url = location.search;
  var query = url.substr(1);
  var result = {};
  if( !query ) return result;

  query.split("&").forEach(function(part) {
    var item = part.split("=");
    if( item.length > 1 ) result[item[0]] = decodeURIComponent(item[1]);
    else result[item[0]] = true;
  });
  return result;
}

module.exports = new AppStateModelImpl();