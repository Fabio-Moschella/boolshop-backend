const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT == 465 ? true : false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: { rejectUnauthorized: false }
});
const sendEmail = (to, subject, text, html, callback) => {
    const mailOptions = {
        from: `"NOME SITO" <${process.env.EMAIL_USER}>`,
        to: to,
        subject: subject,
        text: text,
        html: html || text };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Errore durante l\'invio dell\'email:', error);
            return callback(error, null); 
        }
        console.log('Messaggio inviato: %s', info.messageId);
        console.log('URL di anteprima: %s', nodemailer.getTestMessageUrl(info)); 
        callback(null, info);
    });
};

module.exports = {
    sendEmail};
const testRecipient = process.env.PERSONAL_EMAIL;
const testSubject = 'Test Email da Node.js - Funziona!';
const testText = 'Ciao! Questa è una email di test inviata con successo dal tuo server Node.js.';
const testHtml = '<h2>Ciao!</h2><p>Questa è una email di <b>test</b> inviata con successo dal tuo server Node.js.</p>';

sendEmail(testRecipient, testSubject, testText, testHtml, (error, info) => {
    if (error) {
        console.error('ERRORE durante l\'invio dell\'email di test:', error);
    } else {
        console.log('Email di test inviata con successo!');
        console.log('MessageId:', info.messageId);
    }
});