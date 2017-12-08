
module.exports = subclass => 
  class SearchInterface extends subclass {

    constructor() {
      super();
      this._injectModel('SearchModel');
    }

    async _searchPackages(query) {
      return this.SearchModel.search(query);
    }

    async _searchQueryToUrl(query) {
      return this.SearchModel.toUrl(query);
    }

    async _urlToSearchQuery(url) {
      return this.SearchModel.fromUrl(url);
    }
  }