const data = require("../controlled-vocabulary");

class ControlledVocabulary {

  constructor() {
    this.themes = data;
    this.families = {};
    this.specifics = {};

    for( var theme in data ) {
      for( var family in data[theme] ) {
        this.families[family] = theme;
        let specifics = data[theme][family];
        specifics.forEach(val => this.specifics[val] = family);
      }
    }
  }

  /**
   * @method getThemeObjectArray
   * @description given a package create a array of objects
   * each containing a unquie theme/family/specific triple
   * 
   * @param {Object} package 
   * 
   * @returns {Array}
   */
  getThemeObjectArray(pkg) {
    let resp = [];

    let used = {
      theme : {},
      family : {}
    };

    let specifics = this._getThemeAsArray(pkg, 'specific');
    let families = this._getThemeAsArray(pkg, 'family');
    let themes = this._getThemeAsArray(pkg, 'theme');

    specifics.forEach(val => {
      let family = this.specifics[val];
      let theme = this.families[family];

      used.theme[theme] = true;
      used.family[family] = true;

      resp.push({theme, family, specific: val});
    });

    families.forEach(val => {
      if( used.family[val] ) return;
      let theme = this.families[val];
      used.theme[theme] = true;
      resp.push({theme, family: val});
    });

    themes.forEach(val => {
      if( used.theme[val] ) return;
      resp.push({theme: val});
    });

    return resp;
  }

  themeObjectArrayToPackageArrays(themes) {
    let values = {
      theme : {},
      family : {},
      specific : {}
    }

    themes.forEach(obj => {
      for( let key in values ) {
        if( obj[key] ) values[key][obj[key]] = true;
      }
    });

    for( let key in values ) {
      values[key] = Object.keys(values[key]);
    }

    return values;
  } 

  _getThemeAsArray(pkg, key) {
    let value = pkg[key];
    if( !value ) return [];
    if( Array.isArray(value) ) return value;
    return [value];
  }

  setTheme(pkg) {

  }


}

module.exports = new ControlledVocabulary();