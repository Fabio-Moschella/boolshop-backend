const connection = require("../data/db.js");
const { sendEmail } = require('../services/emailService.js');


// INDEX TUTTE LE SCARPE

const indexAll = (req, res) => {
  const sqlSneaker = "SELECT * FROM sneakers";

  connection.query(sqlSneaker, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });

    res.json({
      results,
    });
  });
};


// INDEX ULTIMI 5 ARRIVI

const indexLatest = (req, res) => {
  const sqlLatestSneaker = `SELECT *
FROM sneakers
ORDER BY date_of_arrival DESC 
LIMIT 5`;
  connection.query(sqlLatestSneaker, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });

    res.json({
      results,
    });
  });
};

// INDEX 5 SCARPE ECONOMICHE PIU ECONOMICHE

const indexCheapest = (req, res) => {
  const sqlCheapestSneaker = `SELECT *
FROM sneakers
ORDER BY price ASC
LIMIT 5`;
  connection.query(sqlCheapestSneaker, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });

    res.json({
      results,
    });
  });
};

// DETTAGLIO SCARPA

const show = (req, res) => {
  const model = decodeURIComponent(req.params.model);
  const brand = decodeURIComponent(req.params.brand);

  const sqlCurrentSneaker = "SELECT * FROM sneakers WHERE brand = ?  AND model = ? ";
  const sqRelatedSneaker = "SELECT * FROM sneakers WHERE brand = ?  AND model != ? ";

  connection.query(sqlCurrentSneaker, [brand, model], (err, currentSneakerResults) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (currentSneakerResults.length === 0)
      return res.status(404).json({ error: "sneaker not found" });

    connection.query(sqRelatedSneaker, [brand, model], (err, relatedSneakerResults) => {
      if (err) return res.status(500).json({ error: "Database query failed" });
      if (relatedSneakerResults.length === 0)
        return res.status(404).json({ error: "sneaker not found" });

      const sneaker = {
      ...currentSneakerResults[0],
      relatedSneakerResults,
    }
    res.json({sneaker});
  });
    });

    
};

// post per dati del pop-up di benvenuto

const postPopUp =(req,res) =>{

  const {name ,surname, email} = req.body;

  let errors =[]

  if(!name){errors.push({message:"controlla i dati immessi nel campo nome"})};

  if(!surname){errors.push({message:"controlla i dati immessi nel campo cognome"})};

  if(!email){errors.push({message:"controlla i dati immessi nel campo e-mail"})};

  const testSubject = `Benvenuto in Boolshop ${name}!`;
  const testText = 'Ciao! Questa è una email di test inviata con successo dal tuo server Node.js.';
  const testHtml = `<h2>Ciao ${name} ${surname}!</h2>
  <p>Questa è una email di benvenuto al nostro e-commerce</p>`;

const queryPopUp = `INSERT INTO data_popup (name,surname,email) VALUES(?, ?, ?)`

connection.query(queryPopUp,[name,surname,email],(err,results) =>{
   if (err) return res.status(500).json({ message: "Errore del server", err });
   res.status(201).json({message:"Dati ricevuti correttamente"})
   console.log(results);
   
   if (errors.length) {
    return res.status(400).json(errors)
  }
  else {
    sendEmail(email, testSubject, testText, testHtml, (error, info) => {
      if (error) {
          console.error('ERRORE durante l\'invio dell\'email di test:', error);
      } else {
          console.log('Email di test inviata con successo!');
          console.log('MessageId:', info.messageId);
      };
    });
  };
})
}


// rotta per dati checkout

const postCheckOut =(req,res) =>{


  const {name ,surname,address,phone, email} = req.body

  let errors =[]

  if(!name){errors.push({message:"controlla i dati immessi nel campo nome"})}

  if(!surname){errors.push({message:"controlla i dati immessi nel campo cognome"})}

  if(!address){errors.push({message:"controlla i dati immessi nel campo dell'indirizzo"})}

  if(!phone){errors.push({message:"controlla i dati immessi nel campo phone"})}

  if(!email){errors.push({message:"controlla i dati immessi nel campo e-mail"})}

  const testSubject = 'Test Email da Node.js - Funziona!';
  const testText = 'Ciao! Questa è una email di test inviata con successo dal tuo server Node.js.';
  const testHtml = `<h2>Ciao ${name} ${surname}!</h2><p>Questa è una email di <b>test</b> inviata con successo dal tuo server Node.js.</p>`;

  if (errors.length){return res.status(400).json(errors)}else {
    sendEmail([email,process.env.EMAIL_USER], testSubject, testText, testHtml, (error, info) => {
      if (error) {
          console.error('ERRORE durante l\'invio dell\'email di test:', error);
      } else {
          console.log('Email di test inviata con successo!');
          console.log('MessageId:', info.messageId);
      };
    });
  };


const queryPopUp = `INSERT INTO data_checkout (name,surname,address,phone,email) VALUES(?, ?, ?, ?, ?)`

connection.query(queryPopUp,[name,surname,address,phone,email],(err,results) =>{
   if (err) return res.status(500).json({ message: "Errore del server", err });
   res.status(201).json({message:"Dati ricevuti correttamente"})
   console.log(results);
   
   
})
}

module.exports = { indexAll, indexLatest, indexCheapest, show , postPopUp, postCheckOut};

