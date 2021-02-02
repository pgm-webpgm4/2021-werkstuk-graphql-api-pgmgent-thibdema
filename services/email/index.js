const dotenv = (require('dotenv')).config();
const nodemailer = require('nodemailer');

class Mailing {
  constructor(to, from, subject, content, host="", port=587, secure=false, auth={user: "", pass: ""}) {
    this.mailOptions = {
      from: from,
      to: to,
      subject: subject,
      html: content,
    };

    this.transporter = nodemailer.createTransport({
      host: host,
      port: port,
      secure: secure, // true for 465, false for other ports
      auth: auth,
    });

  }

  static sendMail() {
    return new Promise((resolve, reject) => {
      this.transporter.sendMail(this.mailOptions, (error, info) => {
        if (error) reject(error);
        else resolve(info);
      });
    });
  }


}

module.exports = Mailing;