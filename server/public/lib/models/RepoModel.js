const {BaseModel} = require('@ucd-lib/cork-app-utils');
const RepoService = require('../services/RepoService');
const RepoStore = require('../stores/RepoStore');

class RepoModel extends BaseModel {

  constructor() {
    super();

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
   * @method delete
   * @description delete repository
   * 
   * @param {String} name name of repository to delete
   */
  async delete(name) {
    return this.service.delete(name);
  }




}