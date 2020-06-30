const mongo = require('../lib/mongo');
const config = require('../lib/config');

class SitemapModel {

  /**
   * @method middleware
   * @description wireup middleware for sitemap
   * 
   * @param {Object} app express app instance
   */
  middleware(app) {
    let allow = 'Allow: /';
    if( config.server.url !== 'https://ecosml.org' ) {
      allow = 'Disallow: /';
    }

    app.get(/^\/sitemap.xml/, (req, res) => this._onRequest(req, res));
    app.get('/robots.txt', (req, res) => {
      res.set('Content-Type', 'text/plain');
      res.send(`User-agent: * 
${allow}
Sitemap: ${config.server.url}/sitemap.xml`);
    });
  }

  /**
   * @method _onRequest
   * @description handle any request that starts with /sitemap.  Bound
   * to express app route above
   * 
   * @param {Object} req express request
   * @param {Object} res express response
   */
  async _onRequest(req, res) {
    res.set('Content-Type', 'application/xml');
    
    try {
      res.send(await this.getRoot(res));
    } catch(e) {
      res.set('Content-Type', 'application/json');
      res.status(500).json({
        error : true,
        message : e.message,
        stack : e.stack
      });
    }
  }

  /**
   * @method getRoot
   * @description create the root sitemapindex for all collections
   * 
   * @returns {Promise} resolves to xml string
   */
  async getRoot(res) {
    let packages = await mongo.getAllPackageNames();

    res.write(`<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`);


    (packages || [])
      .map(result => {
        return `${config.server.url}/package/${result.fullName}`
      })
      .forEach(url => {
        res.write(`<url>
          <loc>${url}</loc>
          <changefreq>weekly</changefreq>
          <priority>.5</priority>
        </url>\n`);
      });

    res.write('</urlset>');
    res.end();
  }

}

module.exports = new SitemapModel();