const fs = require('fs-extra');
const path = require('path');

// let files = fs.readdirSync(__dirname)
//   .filter(file => file !== 'index.js');
// let templates = {};

// files.forEach(file => templates[file] = fs.readFileSync(path.join(__dirname, file), 'utf-8'));

// module.exports = (file, values = {}) => {
//   if( !templates[file] ) return null;
  
//   let t = templates[file];
//   for( let key in values ) {
//     t = t.replace(new RegExp('{{'+key+'}}', 'g'), values[key]);
//   }

//   return t;
// }

module.exports = async function(file, values = {}) {
  let t = await fs.readFile(file, 'utf-8');
  for( let key in values ) {
    t = t.replace(new RegExp('{{'+key+'}}', 'g'), values[key]);
  }
  await fs.writeFile(file, t);
}