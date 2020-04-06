const nodemailer = require('nodemailer');
const config = require('./config');

class Mail {

  constructor() {
    this.transporter = nodemailer.createTransport(config.mail.config);
  }

  /**
   * @method send
   * @description send email
   * 
   * @param {String|Array} to email(s) to send to
   * @param {String} subject email subject line
   * @param {String} msg email body
   */
  send(to, subject, msg) {
    if( Array.isArray(to) ) {
      to = to.join(',');
    }

    return transporter.sendMail({
      from: config.mail.from,
      to, subject,
      text: msg,
    });
  }

}

module.exports = new Mail();