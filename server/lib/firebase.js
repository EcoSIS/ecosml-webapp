const admin = require('firebase-admin');
const EventEmitter = require('events');
const config = require('./config');
const collections = config.firebase.collections;

class Firebase extends EventEmitter {

  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(config.firebase.key)
    });

    this.firestore = admin.firestore();

    this.initObservers();
  }

  initObservers() {

    // listen for github commits
    this.firestore
      .collection(collections.githubCommits)
      .onSnapshot(
        docSnapshot => this.emit('github-commit', docSnapshot), 
        e => console.log('Encountered error listening to github commits', e)
      );

    // listen for travis builds
    this.firestore
      .collection(collections.travis)
      .onSnapshot(
        docSnapshot => this.emit('travis-test-complete', docSnapshot), 
        e => console.log('Encountered error listening to travis', e)
      );
  }

  /**
   * @method get
   * @description get a document by id
   * 
   * @param {String} collection collection name
   * @param {String} id document id
   * 
   * @returns {Promise} resolves to document object
   */
  get(collection, id) {
    return this.firestore
      .collection(collection)
      .doc(id)
      .get()
  }

  /**
   * @method getAllCommitEvents
   * @description get all github commit events
   * 
   * @returns {Promise} resolves to array of doc objects
   */
  getAllCommitEvents() {
    return this.firestore
      .collection(collections.githubCommits)
      .get()
  }



}

module.exports = new Firebase();