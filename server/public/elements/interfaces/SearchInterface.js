
module.exports = subclass => 
  class SearchInterface extends subclass {

    constructor() {
      super();
      this._injectModel('SearchModel');
    }

    _appendSearchFilter(key, value) {
      return this.SearchModel.appendFilter(key, value);
    }

    _removeSearchFilter(key, value) {
      return this.SearchModel.removeFilter(key, value);
    }

    _setSearchText(text) {
      return this.SearchModel.setText(text);
    }

    _setSearchLimit(limit) {
      return this.SearchModel.setLimit(limit);
    }

    _setSearchOffset(offset) {
      return this.SearchModel.setOffset(offset);
    }

    async _searchPackages(query) {
      return this.SearchModel.search(query);
    }

    _searchQueryToUrl(query) {
      return this.SearchModel.toUrl(query);
    }

    _urlToSearchQuery(url) {
      return this.SearchModel.fromUrl(url);
    }

    _getEmptySearchQuery() {
      return this.SearchModel.getEmptyQuery();
    }

    _getOwnerPackages(owner) {
      return this.SearchModel.getOwnerPackages(owner);
    }
  }