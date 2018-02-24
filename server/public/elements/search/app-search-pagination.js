import {Element as PolymerElement} from "@polymer/polymer/polymer-element"
import template from "./app-search-pagination.html"

export default class AppSearchPagination extends PolymerElement {

  static get template() {
    return template;
  }

  static get properties() {
    return {
      itemsPerPage : {
        type : Number,
        value : 10
      },
      currentIndex : {
        type : Number,
        value : 1
      },
      textMode : {
        type : Boolean,
        value : false
      },
      textDisplay : {
        type : String,
        computed : '_computeTextDisplay(currentIndex, totalResults, itemsPerPage)'
      },
      totalResults : {
        type : Number,
        value : 1
      },
      numShownPages : {
        type : Number,
        value : 5
      },
      pages : {
        type : Array,
        value : function() {
          return []
        }
      },
      lastPageIndex: {
        type: Number,
        value: 1
      },
      firstPage : {
        type : Boolean,
        value : true
      },
      lastPage : {
        type: Boolean,
        value: false
      },
      loading : {
        type : Boolean,
        value : false
      }
    };
  }
  
  static get observers() {
    return [
      // Observer method name, followed by a list of dependencies, in parenthesis
      '_onPageChanged(currentIndex, itemsPerPage, totalResults)'
    ]
  }
  
  _computeTextDisplay(currentIndex, totalResults, itemsPerPage) {
    if( totalResults === 0 ) return 'No results found';
    var to = (currentIndex+itemsPerPage < totalResults) ? (currentIndex+itemsPerPage) : totalResults;
    var current = currentIndex+1;
    if( current > to ) current = to;
    return `Showing ${current} to ${to} of ${totalResults}`;
  }

  _onPageChanged() {
    this.firstPage = false;
    this.lastPage = false;
    var pages = [];
    this.currentPage = Math.floor(this.currentIndex / this.itemsPerPage) + 1;
    var offset = Math.floor(this.numShownPages / 2);
    this.lastPageIndex = Math.max(Math.ceil(this.totalResults / this.itemsPerPage), 1);
    var startPage = this.currentPage - offset;
    var endPage = this.currentPage + offset;
    if( startPage < 1 ) {
      endPage = (1 - startPage) + endPage;
    }
    if( endPage > this.lastPageIndex ) {
      startPage = startPage - (endPage - this.lastPageIndex);
      endPage = this.lastPageIndex;
    }
    if( startPage < 1 ) startPage = 1;
    this.firstPage = (this.currentPage === 1) ? true : false;
    if( startPage === 1 ) startPage = 2;
    this.lastPage = (this.currentPage === this.lastPageIndex) ? true : false;
    if( endPage === this.lastPageIndex ) endPage = this.lastPageIndex - 1;
    for( var i = startPage; i <= endPage; i++ ) {
      pages.push({
        index : i,
        selected : (i === this.currentPage) ? true : false
      });
    }
    this.$.lastPage.style.display = (this.lastPageIndex > 1) ? 'inline-block' : 'none';
    this.$.startEllipsis.style.display = (startPage > 2) ? 'inline-block' : 'none'; 
    this.$.stopEllipsis.style.display = (endPage < (this.lastPageIndex - 1)) ? 'inline-block' : 'none'; 
    this.pages = pages;
  }
  
  previous() {
    this._fireNav({
      page : this.currentPage - 1,
      startIndex : (this.currentPage - 2) * this.itemsPerPage
    });
  }
  
  next() {
    this._fireNav({
      page : this.currentPage + 1,
      startIndex : (this.currentPage) * this.itemsPerPage
    });
  }

  _selectPage(e) {
    var page = parseInt(e.currentTarget.innerHTML);
    this._fireNav({
      page : page,
      startIndex : (page-1) * this.itemsPerPage
    });
  }
  
  previousSection() {
    var offset = Math.floor(this.numShownPages / 2) + 1;
    var currentStartPage = this.pages[0].index;
    var page = currentStartPage - offset;
    
    if( page < 1 ) page = 1;
    this._fireNav({
      page : page,
      startIndex : (page-1) * this.itemsPerPage
    });
  }
  
  nextSection() {
    var offset = Math.floor(this.numShownPages / 2) + 1;
    var currentStartPage = this.pages[this.pages.length-1].index;
    var page = currentStartPage + offset;
    
    if( page > this.lastPageIndex ) page = this.lastPageIndex;
    this._fireNav({
      page : page,
      startIndex : (page-1) * this.itemsPerPage
    });
  }

  _fireNav(payload) {
    this.dispatchEvent(new CustomEvent('nav', {detail: payload}));
  }

}

customElements.define('app-search-pagination', AppSearchPagination);