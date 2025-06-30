require("dotenv").config();
const port = process.env.BACKEND_PORT;
const url = process.env.LOCAL_URL;
const express = require("express");
const app = express();

//* --- Importo il tuo servizio email x test (poi va spostato su controllers o routers) ---
const { sendEmail } = require('./services/emailService.js');

const sneakerRouter = require("./routers/sneakers.js");
const errorHandler = require("./middleware/errorhandler.js");
const cors = require("cors");

const errorNotFound = require("./middleware/errorNotFound.js");

//STATIC ASSEST
app.use(cors({ origin: `${url}:5173` }));
app.use(express.static("public"));
app.use(express.json());
//ROUTERS
app.use("/sneakers", sneakerRouter);

//MIDDLEWARE
app.use(errorHandler);
app.use(errorNotFound);
// IL SERVER E IN ASCOLTO SULLA PORTA 3000
app.listen(port, () => {
  console.log("il server è in ascolto sulla porta " + port);

//* --- BLOCCO DI TEST EMAIL: verrà eseguito all'avvio del server ---
// queste variabili verranno sostituite con i dati del db
    const testRecipient = 'mike.milzoni@gmail.com';
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
});