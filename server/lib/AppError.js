
const ERROR_CODES = {
  MISSING_ATTRIBUTE : 1,
  BAD_API_RESPONSE : 2,
  INVALID_ATTRIBUTE : 3
}


module.exports = class AppError extends Error {

  static get ERROR_CODES() {
    return ERROR_CODES;
  }

  constructor(msg, code) {
    super(msg);
    this.isAppError = true;
    this.appErrorCode = code;
  }
}