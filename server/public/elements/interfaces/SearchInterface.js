
module.exports = subclass => 
  class SearchInterface extends subclass {

    constructor() {
      super();
      this._injectModel('SearchModel');
    }

    async _searchPackages(query, options) {
      return this.SearchModel.search(query, options);
    }
  }