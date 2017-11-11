module.exports = {
  repo : {
    title : {
      type : String,
      label : 'Title'
    },
    overview : {
      type : String,
      label : 'Overview (Short Description)',
      description : 'One sentance summary of package'
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