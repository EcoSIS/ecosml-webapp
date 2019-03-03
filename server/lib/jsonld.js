module.exports = pkg => {
  let jsonld = {
    "@context": "http://schema.org",
    "@type": "dataset",
    "provider": {
      "@type": "Organization",
      "url": "https://ecosml.org",
      "name": "EcoSML",
      "description": "EcoSML is a repository for the spectral models that can used to predict variables of interest from spectral data."
    },
    name : pkg.name,
    description : pkg.overview,
    url : 'https://ecosml.org/package/'+pkg.id,
    datePublished : pkg.createdAt,
    genre : 'spectroscopy',
    distribution : [
      {
        "@type": "DataDownload",
        "name": "EcoSML Webpage",
        "contentUrl": 'https://ecosml.org/package/'+pkg.id,
      },
      {
        "@type": "DataDownload",
        "name": "Git Access",
        "contentUrl": pkg.htmlUrl.replace(/^https?/, 'git')+'.git'
      },
      {
        "@type": "DataDownload",
        "name": "Releases",
        "contentUrl": pkg.htmlUrl+'/releases'
      }
    ],
    author : {
      name : pkg.owner
    },
    keywords : pkg.keywords || []
  }

  if( pkg.organizationInfo ) {
    pkg.publisher = {
      '@type' : 'Organization',
      name : pkg.organizationInfo.displayName,
      description : pkg.organizationInfo.description,
      image : pkg.organizationInfo.logo
    }
  }

  return jsonld;
}