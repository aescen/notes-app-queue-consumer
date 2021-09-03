const nodemailer = require('nodemailer');

class MailSender {
  constructor() {
    this._trasporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  sendMail(targetMail, content) {
    const mail = {
      from: `"Notes App" <${process.env.MAIL_ADDRESS}>`,
      to: targetMail,
      subject: 'Ekspor Catatan',
      text: 'Terlampir hasil ekspor catatan.',
      html: '<p>Terlampir hasil ekspor catatan.</p>',
      attachments: [
        {
          filename: 'notes.json',
          content,
          contentType: 'application/json',
        },
      ],
    };
    return this._trasporter.sendMail(mail);
  }
}

module.exports = MailSender;
