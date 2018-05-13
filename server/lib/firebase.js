const admin = require('firebase-admin');
const EventEmitter = require('events');
const config = require('./config');
const logger = require('./logger');
const collections = config.firebase.collections;

class Firebase extends EventEmitter {

  constructor() {
    super();

    admin.initializeApp({
      credential: admin.credential.cert(config.firebase.key)
    });

    this.firestore = admin.firestore();
    this.collections = collections;

    this.BUFFER_TIME = 1000 * 5;
    this.bufferTimers = {};

    this.EVENTS = {
      GITHUB_COMMIT : 'github-commit',
      GITHUB_TEAM_UPDATE : 'github-team-update',
      TRAVIS_TESTING_COMPLETE : 'travis-test-complete',
      ECOSIS_ORG_UPDATE : 'ecosis-org-update'
    }

    logger.info('Firebase env: '+config.firebase.env);
  }

  initObservers() {

    // listen for github commits
    this.firestore
      .collection(collections.githubCommits)
      .onSnapshot(
        docSnapshot => {
          docSnapshot.forEach((doc) => {
            // let data = doc.data();
            // this.emitBuffered(data.body.respository.name, this.EVENTS.GITHUB_COMMIT, data);
          });
        }, 
        e => logger.error('Encountered error listening to github commits', e)
      );

    // listen for travis builds
    this.firestore
      .collection(collections.travis)
      .onSnapshot(
        docSnapshot => {
          docSnapshot.forEach((doc) => {
            // let data = doc.data();
            // this.emitBuffered(data.payload.respository.name, this.EVENTS.TRAVIS_TESTING_COMPLETE, data);
          });
        },
        e => logger.error('Encountered error listening to travis', e)
      );

   
  }

  /**
   * @method initGithubTeamObserver
   * @description wire up the observer to the github team collection listener.  
   * This should be called by the lib/sync/github module.
   * 
   * @param {Function} callback called when documents update 
   */
  initGithubTeamObserver(callback) {
    logger.info(`Listening to firebase collection: ${collections.githubTeams}`);
    this.firestore
      .collection(collections.githubTeams)
      .onSnapshot(
        callback,
        e => logger.error('Encountered error listening to github team firestore collection', e)
      );
  }

  /**
   * @method initGithubCommitObserver
   * @description wire up the observer to the github commit collection listener.  
   * This should be called by the PackageModel
   * 
   * @param {Function} callback called when documents update 
   */
  initGithubCommitObserver(callback) {
    logger.info(`Listening to firebase collection: ${collections.githubCommits}`);
    this.firestore
      .collection(collections.githubCommits)
      .onSnapshot(
        callback,
        e => logger.error('Encountered error listening to github commit firestore collection', e)
      );
  }

  /**
   * @method initEcoSISObserver
   * @description wire up the ecosis collection listener.  This should be called
   * by the lib/sync/ecosis module.
   * 
   * @param {Function} callback called when documents update 
   */
  initEcoSISObserver(callback) {
    logger.info(`Listening to firebase collection: ${collections.ecosisOrgs}`);
    this.firestore
      .collection(collections.ecosisOrgs)
      .onSnapshot(
        callback,
        e => logger.error('Encountered error listening to ecosis firestore collection', e)
      );
  }

  /**
   * @method emitBuffered
   * @description events will be sent buffered as a group, sorted 
   * by timestamp 
   * 
   * @param {String} id unique id to identify data by 
   * @param {String} event event name 
   * @param {String} data 
   */
  emitBuffered(id, event, data) {
    id = event+'-'+id;

    if( this.bufferTimers[id] ) {
      clearTimeout(this.bufferTimers[id].timer);
      this.bufferTimers[id].data.push(data);
    } else {
      this.bufferTimers[id] = {
        data : [data]
      }
    }

    this.bufferTimers[id].timer = setTimeout(() => {
      this.bufferTimers[id].data.sort((a,b) => {
        if( a.timestamp > b.timestamp ) return -1;
        if( a.timestamp < b.timestamp ) return 1;
        return 0;
      })

      this.emit(event, this.bufferTimers[id].data);
      delete this.bufferTimers[id];
    }, this.BUFFER_TIME);
  }

  /**
   * @method getDataFromChangeDoc
   * @description helper method, returns change doc
   * data with fsChangeType and fsId appended to doc data
   * 
   * @param {Object} change firestore DocumentChange
   */
  getDataFromChangeDoc(change) {
    let data = change.doc.data();
    data.fsChangeType = change.type;
    data.fsId = change.doc.id;
    return data;
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

  /**
   * @method ackEcoSISEvent
   * @description after we have successfully handled a ecosis event,
   * remove the doc.
   * 
   * @returns {Promise}
   */
  ackEcoSISEvent(docId) {
    logger.info('Acking EcoSIS sync event: '+docId);
    return this._deleteFirestoreDoc(this.firestore
      .collection(collections.ecosisOrgs)
      .doc(docId));
  }

  /**
   * @method ackGithubTeamEvent
   * @description after we have successfully handled a github team event,
   * remove the doc.
   * 
   * @returns {Promise}
   */
  ackGithubTeamEvent(docId) {
    logger.info('Acking Github team event: '+docId);
    return this._deleteFirestoreDoc(this.firestore
      .collection(collections.githubTeams)
      .doc(docId));
  }

  /**
   * @method ackGithubCommitEvent
   * @description after we have successfully handled a github commit event,
   * remove the doc.
   * 
   * @returns {Promise}
   */
  ackGithubCommitEvent(docId) {
    logger.info('Acking Github commit event: '+docId);
    return this._deleteFirestoreDoc(this.firestore
      .collection(collections.githubCommits)
      .doc(docId));
  }

  /**
   * @method _deleteFirestoreDoc
   * @description make sure the document exists before deleting
   *
   * @param {Object} ref firestore document reference
   *
   * @returns {Promise}
   */
  async _deleteFirestoreDoc(ref) {
    let snapshot = await ref.get();
    if( !snapshot.exists ) return;
    return ref.delete();
  }



}

module.exports = new Firebase();