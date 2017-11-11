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
   */
  async create(name, description) {
    return this.service.create(name, description);
  }

  /**
   * @method update
   * @description update repository
   * 
   * @param {Object} data data to update repository with
   */
  async update(data) {
    return this.service.update(data);
  }

  /**
   * @method delete
   * @description delete repository
   * 
   * @param {String} name name of repository to delete
   */
  async delete(name) {
    return this.service.delete(name);
  }

}

module.exports = new RepoModel();