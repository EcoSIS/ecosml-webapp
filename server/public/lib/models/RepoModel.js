const {BaseModel} = require('@ucd-lib/cork-app-utils');
const RepoService = require('../services/RepoService');
const RepoStore = require('../stores/RepoStore');
const RepoSchema = require('../schema').repo;

class RepoModel extends BaseModel {

  constructor() {
    super();

    this.schema = RepoSchema;

    this.store = RepoStore;
    this.service = RepoService;
      
    this.register('RepoModel');
  }

  /**
   * @method create
   * @description create repository
   * 
   * @param {String} name name of new repository
   * @param {String} description short description of repository 
   * @returns {Promise} fetch promise
   */
  async create(name, description) {
    return this.service.create(name, description);
  }

  /**
   * @method get
   * @description get repository by id
   * 
   * @param {String} id ecosml id 
   * @returns {Promise} fetch promise
   */
  async get(id) {
    return this.service.get(id);
  }

  /**
   * @method update
   * @description update repository
   * 
   * @param {Object} data data to update repository with
   * @returns {Promise} fetch promise
   */
  async update(data) {
    return this.service.update(data);
  }

  /**
   * @method delete
   * @description delete repository
   * 
   * @param {String} name name of repository to delete
   * @returns {Promise} fetch promise
   */
  async delete(name) {
    return this.service.delete(name);
  }

}

module.exports = new RepoModel();