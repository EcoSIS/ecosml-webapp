module.exports = {
  package : {
    name : {
      type : String,
      label : 'Name'
    },
    overview : {
      type : String,
      label : '',
      description : ''
    },
    description : {
      type : String,
      label : 'Description',
      description : 'Long package description.  Markdown supported.'
    },
    keywords : {
      type : Array,
      label : 'Keywords',
      description : 'Faceted keywords for package discovery'
    }
  }
}