
class AppUtils {

  /**
   * @method toCamelCase
   * @description convert an objects properties to camel case from underscore
   * case.  Very useful for converting github API responses. A new object is returned.
   * 
   * @param {Object} object object with properties to convert.
   * 
   * @returns {Object} new object with camel case
   */
  toCamelCase(object) {
    let newObject = {};
    for( let key in object ) {
      newObject[this._toCamelCase(key)] = object[key];
    }
    return newObject;
  }

  _toCamelCase(str) {
    return str.replace(/_([a-z])/g, (g) => { return g[1].toUpperCase(); });
  }

}

module.exports = new AppUtils();