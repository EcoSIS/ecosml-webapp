const model = require('./PackageModel');

/**
 * @class PackageQueueModel
 * @description We can only have one update happening at a time to a package.  This provides
 * a promise based queue for all package operations
 */
class PackageQueueModel {

  constructor() {
    this.queue = {};
    this.running = {};
  }

  /**
   * @method add
   * @description add operation to the package queue.  The operation should be a update or delete of a file
   * or package metadata.  Anything that can cause a race condition.
   * 
   * @param {String} method method name to call on PackageModel
   * @param {String} packageName name of package to call PackageModel on. Note, this must be the package
   * name, not the id or object.
   * @param {Array} argArray array of arguments to be passed to the method when called.
   * 
   * @returns {Promise} resolves when method has been executed, resolves method response.
   */
  add(method, packageName, argArray) {
    return new Promise((resolve, reject) => {
      // check that a queue exists for this package
      if( !this.queue[packageName] ) {
        this.queue[packageName] = [];
      }
      
      // add operation to the queue
      this.queue[packageName].push({
        method, argArray, resolve, reject
      });

      // if the queue is not already running for this package, start it up
      if( !this.running[packageName] ) {
        this._run(packageName);
      }
    });
  }

  /**
   * @method _run
   * @description run the next item in the queue for a specified package name
   * 
   * @param {String} packageName package name to run
   */
  async _run(packageName) {
    // if the queue is empty, we are done
    if( this.queue[packageName].length === 0 ) {
      this.running[packageName] = false;
      return;
    }
    
    // set the running flag for this queue
    this.running[packageName] = true;
    // grab the first item in the queue
    let op = this.queue[packageName].shift();

    // attempt to run method and either resolve method response or reject on error
    try {
      let result = await model[op.method].apply(model, op.argArray);
      op.resolve(result);
    } catch(e) {
      op.reject(e);
    }
    
    // run next item in the queue
    this._run(packageName);
  }

}

module.exports = new PackageQueueModel();