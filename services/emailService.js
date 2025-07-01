//! modulo riutilizzabile che contiene la logica per l'invio delle email

//* Importo la libreria Nodemailer 
const nodemailer = require('nodemailer');

//* configuro il TRANSPORTER di Nodemailer importando le variabili dal file .env
// TRANSPORTER = oggetto responsabile di COME e DA DOVE le email verranno inviate
const transporter = nodemailer.createTransport({

    // host: indirizzo del server SMTP del provider email
    // "punto di partenza" da cui verranno spedite le email
    host: process.env.SMTP_HOST,

    // 'port': La porta che il server SMTP usa per la comunicazione.
    // Tipicamente 587 (con STARTTLS) o 465 (con SSL/TLS).
    port: process.env.SMTP_PORT,

    // Per Mailtrap, spesso la porta 2525 o 587 richiede secure: false
    // Se Mailtrap ti fornisce una porta 465, allora secure: true
    secure: process.env.SMTP_PORT == 465 ? true : false, // Determina 'secure' in base alla porta

    // 'auth': Credenziali per autenticarsi sul server SMTP.
    auth: {
        // user: email completa
        user: process.env.EMAIL_USER,
        // pass: password email
        pass: process.env.EMAIL_PASS,
    },

    // 'tls': opzioni aggiuntive per la sicurezza della connessione TLS
    tls: {
        // 'rejectUnauthorized: false': Disabilita la verifica dei certificati autofirmati.
        // **IMPORTANTE**: Usare 'false' solo in AMBIENTE DI SVILUPPO. 
        // In produzione, dovresti avere certificati validi e impostare a 'true' (o ometterlo).
        // Con Mailtrap, `rejectUnauthorized: false` è spesso ancora utile in sviluppo,
        // anche se Mailtrap fornisce certificati validi.
        rejectUnauthorized: false
    }
});

//* definisco la funzione 'sendEmail' che prende i dettagli dell'email e la invia
/**
 * @param {string} to - L'indirizzo email del destinatario.
 * @param {string} subject - L'oggetto dell'email.
 * @param {string} text - Il contenuto testuale semplice dell'email.
 * @param {string} html - Il contenuto HTML dell'email (opzionale).
 * @param {function} callback - Una funzione di callback che viene richiamata al termine dell'invio.
 * Prende due argomenti: 'error' (se c'è un errore) e 'info' (informazioni sull'invio riuscito).
 */
const sendEmail = (to, subject, text, html, callback) => {
    // preparazione oggetto con le opzioni dell'email
    // vengono passati al momento della chiamata da fuori (es. da app.js, da una route o da un controller).
    const mailOptions = {
        from: `"NOME SITO" <${process.env.EMAIL_USER}>`,
        // indirizzi destinatari
        to: to,
        // 'subject': L'oggetto dell'email.
        subject: subject,
        // 'text': Il contenuto dell'email in formato testo semplice.
        text: text,
        // 'html': Il contenuto dell'email in formato HTML.
        // Se fornito, prevale sul 'text' per i client email che supportano HTML.
        // L'operatore '|| text' garantisce che ci sia sempre un contenuto, usando il 'text' se l'HTML non è fornito.
        html: html || text
    };

    //* invio l'email usando il transporter
    // 'transporter.sendMail()' è una funzione asincrona.
    // Quando l'invio è completato (o fallisce), esegue la 'callback' fornita.
    transporter.sendMail(mailOptions, (error, info) => {
        //* gestisco il risultato nella callback
        if (error) {
            //se l'errore durante l'invio esiste, lo logga e lo passa alla callback
            console.error('Errore durante l\'invio dell\'email:', error);
            //passo l'errore alla callback (funzione passata come argomento)
            return callback(error, null); 
        }

        // se l'invio è riuscito, loggo le info e le passo alla callback
        //! %s placeholder, segnaposto che indica dove va inserita una stringa
        //! Node.js prende la stringa 'Messaggio inviato: %s', trova il %s, 
        //! e lo sostituisce con il valore della variabile info.messageId convertito in stringa
        //messageId non lo generi manualmente, ma viene creato automaticamente da Nodemailer dopo l'invio dell'email.
        console.log('Messaggio inviato: %s', info.messageId);
        // 'nodemailer.getTestMessageUrl(info)' è utile per testare con servizi come Ethereal.email.
        // funzione di utilità specifica fornita da Nodemailer per facilitare il testing delle email in ambiente di sviluppo.
        // Il suo scopo è generare un URL che, se aperto in un browser web, ti permetterà di visualizzare l'email che è stata "inviata", 
        console.log('URL di anteprima: %s', nodemailer.getTestMessageUrl(info)); 
        callback(null, info); // Passa 'null' per l'errore e 'info' per il successo
    });
};

//* Esporto la funzione 'sendEmail
module.exports = {
    sendEmail
};

//* --- BLOCCO DI TEST EMAIL: verrà eseguito all'avvio del server ---
// queste variabili verranno sostituite con i dati del db
    const testRecipient = process.env.PERSONAL_EMAIL;
    const testSubject = 'Test Email da Node.js - Funziona!';
    const testText = 'Ciao! Questa è una email di test inviata con successo dal tuo server Node.js.';
    const testHtml = '<h2>Ciao!</h2><p>Questa è una email di <b>test</b> inviata con successo dal tuo server Node.js.</p>';

    sendEmail(testRecipient, testSubject, testText, testHtml, (error, info) => {
        if (error) {
            console.error('ERRORE durante l\'invio dell\'email di test:', error);
            // Potrebbe essere utile qui: console.error('Dettagli errore:', error.response); // Se disponibile
        } else {
            console.log('Email di test inviata con successo!');
            console.log('MessageId:', info.messageId);
            // Se usi un account di test Ethereal, potresti vedere un URL qui:
            // console.log('URL di anteprima (solo per test Ethereal):', nodemailer.getTestMessageUrl(info));
        }
    });
    //* --- FINE BLOCCO DI TEST EMAIL ---