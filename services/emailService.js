const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  secure: process.env.SMTP_PORT == 465 ? true : false,
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: { rejectUnauthorized: false },
});

const sendEmail = (to, subject, text, html, callback) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    text: text,
    html: html || text,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Errore durante l'invio dell'email:", error);
      return callback(error, null);
    }
    console.log("Messaggio inviato: %s", info.messageId);
    console.log("URL di anteprima: %s", nodemailer.getTestMessageUrl(info));
    callback(null, info);
  });
};
// I COOMMENTI NON CI PIACCIONO :) <3
module.exports = { sendEmail };
