const model = require('./PackageModel');

/**
 * We can only have one update happening at a time to a package.
 */
class PackageQueueModel {

  constructor() {
    this.queue = {};
    this.running = {};
  }

  async add(method, packageName, argArray) {
    return new Promise((resolve, reject) => {
      if( !this.queue[packageName] ) {
        this.queue[packageName] = [];
      }
  
      this.queue[packageName].push({
        method, argArray, resolve, reject
      });

      if( !this.running[packageName] ) {
        this._run(packageName);
      }
    });
  }

  async _run(packageName) {
    if( this.queue[packageName].length === 0 ) {
      this.running[packageName] = false;
      return;
    }
    
    this.running[packageName] = true;
    let op = this.queue[packageName].shift();

    try {
      let result = await model[op.method].apply(model, op.argArray);
      op.resolve(result);
    } catch(e) {
      op.reject(e);
    }
    
    this._run(packageName);
  }

}

module.exports = new PackageQueueModel();