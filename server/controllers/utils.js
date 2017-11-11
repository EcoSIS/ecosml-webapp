const AppError = require('../lib/AppError');
const logger = require('../lib/logger');

module.exports = {
  handleError : (res, e) => {
    if( e instanceof AppError ) {
      logger.info(`App API Error: ${e.message}, Code: ${e.appErrorCode}`);
      
      res.status(400).json({
        error : true,
        message : e.message
      });

    } else {
      logger.error(e);

      res.status(400).json({
        error : true,
        message : e.message,
        stack : e.stack
      });
    }
  }
}