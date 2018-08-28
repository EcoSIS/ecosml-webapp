const crypto = require('crypto');
const fs = require('fs');

/**
 * @method hash
 * @description create a SHA256 hash of given file
 * 
 * @param {String} file full path to file
 * 
 * @returns {Promise} resolves to SHA256 hash string
 */
module.exports = (file) => {
  return new Promise((resolve, reject) => {
    let hash = crypto.createHash('sha256');
    
    fs.createReadStream(file)
      .on('close', data => resolve(hash.read().toString('hex')))
      .pipe(hash);
  });
}