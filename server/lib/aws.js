const fs = require('fs');
const AWS = require('aws-sdk');
const config = require('./config');

class AWSImpl {

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: config.aws.accessKeyId,
      secretAccessKey: config.aws.secretAccessKey
    });
  }

  /**
   * @method uploadFile
   * @description upload file to S3 bucket
   * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property
   * 
   * @param {String} filePath path to local file
   * @param {String} bucketName name of S3 bucket to upload to
   * @param {String} bucketFilePath path within the bucket to place file
   * 
   * @returns {Promise}
   */
  uploadFile(filePath, bucketName, bucketFilePath) {
    return new Promise((resolve, reject) => {
      this.s3.upload({
        Bucket : bucketName,
        Key : bucketFilePath,
        Body : fs.createReadStream(filePath)
      },(err, data) => {
        if( err ) reject(err);
        else resolve(data);
      });
    });
    
  }

}

module.exports = new AWSImpl();