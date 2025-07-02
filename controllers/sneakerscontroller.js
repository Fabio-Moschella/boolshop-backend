const connection = require("../data/db.js");
const { sendEmail } = require("../services/emailService.js");

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

  const sqlCurrentSneaker =
    "SELECT * FROM sneakers WHERE brand = ?  AND model = ? ";
  const sqRelatedSneaker =
    "SELECT * FROM sneakers WHERE brand = ?  AND model != ? ";

  connection.query(
    sqlCurrentSneaker,[brand, model],(err, currentSneakerResults) => {
      if (err) return res.status(500).json({ error: "Database query failed" });
      if (currentSneakerResults.length === 0)
        return res.status(404).json({ error: "sneaker not found" });

      connection.query(
        sqRelatedSneaker,
        [brand, model],
        (err, relatedSneakerResults) => {
          if (err)
            return res.status(500).json({ error: "Database query failed" });
          if (relatedSneakerResults.length === 0)
            return res.status(404).json({ error: "sneaker not found" });

          const sneaker = {
            ...currentSneakerResults[0],
            relatedSneakerResults,
          };
          res.json({ sneaker });
        }
      );
    }
  );
};

// post per dati del pop-up di benvenuto

const postPopUp = (req, res) => {
  const { name, surname, email } = req.body;

  let errors = [];

  if (!name) {
    errors.push({ message: "controlla i dati immessi nel campo nome" });
  }

  if (!surname) {
    errors.push({ message: "controlla i dati immessi nel campo cognome" });
  }

  if (!email) {
    errors.push({ message: "controlla i dati immessi nel campo e-mail" });
  }
  if (errors.length) {
    return res.status(400).json(errors);
  }

  const testSubject = `Benvenuto in Boolshop ${name}!`;
  const testText =
    "Ciao! Questa è una email di test inviata con successo dal tuo server Node.js.";
  const testHtml = `<h2>Ciao ${name} ${surname}!</h2>
  <p>Questa è una email di benvenuto al nostro e-commerce</p>`;

  const queryPopUp = `INSERT INTO data_popup (name,surname,email) VALUES(?, ?, ?)`;

  connection.query(queryPopUp, [name, surname, email], (err, results) => {
    if (err) return res.status(500).json({ message: "Errore del server", err });
    res.status(201).json({ message: "Dati ricevuti correttamente" });
    console.log(results);

    sendEmail(email, testSubject, testText, testHtml, (error, info) => {
      if (error) {
        console.error("ERRORE durante l'invio dell'email di test:", error);
      } else {
        console.log("Email di test inviata con successo!");
        console.log("MessageId:", info.messageId);
      }
    });
  });
};

// rotta per dati checkout

const postCheckOut = (req, res) => {
  const { name, surname, address, phone, email } = req.body;
  let errors = [];
  if (!name) {
    errors.push({ message: "controlla i dati immessi nel campo nome" });
  }
  if (!surname) {
    errors.push({ message: "controlla i dati immessi nel campo cognome" });
  }
  if (!address) {
    errors.push({
      message: "controlla i dati immessi nel campo dell'indirizzo",
    });
  }
  if (!phone) {
    errors.push({ message: "controlla i dati immessi nel campo phone" });
  }
  if (!email) {
    errors.push({ message: "controlla i dati immessi nel campo e-mail" });
  }
  if (errors.length) {
    return res.status(400).json(errors);
  }
  const userTestSubject = "Test Email da Node.js - Funziona!";
  const userTestText =
    "Ciao! Questa è una email di test inviata con successo dal tuo server Node.js.";
  const userTestHtml = `<h2>Ciao ${name} ${surname}!</h2><p>Questa è una email di <b>test</b> inviata con successo dal tuo server Node.js.</p>`;
  sendEmail(
    [email, process.env.EMAIL_USER],
    userTestSubject,
    userTestText,
    userTestHtml,
    (error, info) => {
      if (error) {
        console.error("ERRORE durante l'invio dell'email di test:", error);
      } else {
        console.log("Email di test inviata con successo!");
        console.log("MessageId:", info.messageId);
      }
    }
  );
  const queryDataCheckout = `INSERT INTO data_checkout (name,surname,address,phone,email) VALUES(?, ?, ?, ?, ?)`;
  const queryOrder = `SELECT
    sneakers.price,
    sneakers.brand,
    sneakers.model,
    sneakers.color,
    sneakers.gender,
    sizes.size,
    order_size.quantity,
    orders.total_price
FROM
    sneakers
        INNER JOIN
    sizes ON sneakers.id_sneaker = sizes.id_sneaker
        INNER JOIN
    order_size ON sizes.id_size = order_size.id_size
        INNER JOIN
    orders ON order_size.id_order = orders.id_order
        INNER JOIN
    data_checkout ON orders.id_data_checkout = data_checkout.id_data_checkout`;
  connection.query(
    queryDataCheckout,
    [name, surname, address, phone, email],
    (err, results) => {
      if (err)
        return res.status(500).json({ message: "Errore del server", err });
      res.status(201).json({ message: "Dati ricevuti correttamente" });
      console.log(results);
      connection.query(queryOrder, (err, results) => {
        if (err)
          return res.status(500).json({ message: "Errore del server", err });
        res.status(201).json({ message: "Dati ricevuti correttamente" });
        console.log(results);
        sendEmail(
          [email, process.env.EMAIL_USER],
          userTestSubject,
          userTestText,
          userTestHtml,
          (error, info) => {
            if (error) {
              console.error(
                "ERRORE durante l'invio dell'email di test:",
                error
              );
            } else {
              console.log("Email di test inviata con successo!");
              console.log("MessageId:", info.messageId);
            }
          }
        );
      });
    }
  );
};

module.exports = {
  indexAll,
  indexLatest,
  indexCheapest,
  show,
  postPopUp,
  postCheckOut,
};
