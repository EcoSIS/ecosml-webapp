const AppError = require('../lib/AppError');
const logger = require('../lib/logger');

module.exports = {
  handleError : (res, e) => {
    if( e instanceof AppError ) {
      logger.warn(`App API Error: ${e.message}, Code: ${e.appErrorCode}`);
      
      res.status(400).json({
        error : true,
        message : e.message,
        code : e.appErrorCode,
        stack : e.stack
      });

    } else {
      logger.warn(e);

      res.status(400).json({
        error : true,
        message : e.message,
        stack : e.stack
      });
    }
  }
}