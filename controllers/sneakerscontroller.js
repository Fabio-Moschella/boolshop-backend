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
  const slug = decodeURIComponent(req.params.slug);

  const sqlCurrentSneaker = "SELECT * FROM sneakers WHERE slug = ?";

  connection.query(sqlCurrentSneaker, [slug], (err, currentSneakerResults) => {
    if (err) return res.status(500).json({ error: "Database query failed" });

    if (currentSneakerResults.length === 0)
      return res.status(404).json({ error: "Sneaker not found" });

    const currentSneaker = currentSneakerResults[0];
    const brand = currentSneaker.brand;

    const sqlRelatedSneakers =
      "SELECT * FROM sneakers WHERE brand = ? AND slug != ?";

    connection.query(
      sqlRelatedSneakers,
      [brand, slug],
      (err, relatedSneakersResults) => {
        if (err)
          return res.status(500).json({ error: "Database query failed" });

        const sneaker = {
          ...currentSneaker,
          related: relatedSneakersResults,
        };

        res.json({ sneaker });
      }
    );
  });
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

const postCheckOut = (req, res) => {
  const { name, surname, address, phone, email, items } = req.body;

  let errors = [];

  if (!name)
    errors.push({ message: "controlla i dati immessi nel campo nome" });
  if (!surname)
    errors.push({ message: "controlla i dati immessi nel campo cognome" });
  if (!address)
    errors.push({
      message: "controlla i dati immessi nel campo dell'indirizzo",
    });
  if (!phone)
    errors.push({ message: "controlla i dati immessi nel campo phone" });
  if (!email)
    errors.push({ message: "controlla i dati immessi nel campo e-mail" });
  if (!Array.isArray(items) || items.length === 0) {
    errors.push({ message: "Il carrello è vuoto." });
  }

  if (errors.length) return res.status(400).json(errors);

  const queryDataCheckout = `
    INSERT INTO data_checkout (name, surname, address, phone, email)
    VALUES (?, ?, ?, ?, ?)
  `;

  connection.query(
    queryDataCheckout,
    [name, surname, address, phone, email],
    (err, result) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Errore salvataggio utente", err });

      const id_data_checkout = result.insertId;
      const sizeIds = items.map((item) => item.id_size);
      const placeholders = sizeIds.map(() => "?").join(",");

      const queryPrices = `
      SELECT sizes.id_size, sneakers.id_sneaker, sneakers.price
      FROM sizes
      JOIN sneakers ON sizes.id_sneaker = sneakers.id_sneaker
      WHERE sizes.id_size IN (${placeholders})
    `;

      connection.query(queryPrices, sizeIds, (err, priceResults) => {
        if (err)
          return res
            .status(500)
            .json({ message: "Errore recupero prezzi", err });

        const sneakerMap = {};
        const sizeToSneaker = {};

        priceResults.forEach((row) => {
          sizeToSneaker[row.id_size] = row.id_sneaker;
          sneakerMap[row.id_sneaker] = row.price;
        });

        let total_price = parseInt(0);

        items.forEach((item) => {
          const id_sneaker = sizeToSneaker[item.id_size];
          const itemPrice = sneakerMap[id_sneaker];
          total_price += itemPrice * item.quantity;
        });

        const queryOrder = `
        INSERT INTO orders (id_data_checkout, total_price)
        VALUES (?, ?)
      `;

        connection.query(
          queryOrder,
          [id_data_checkout, total_price],
          (err, result) => {
            if (err)
              return res
                .status(500)
                .json({ message: "Errore salvataggio ordine", err });

            const id_order = result.insertId;
            const orderItems = items.map((item) => [
              item.id_size,
              id_order,
              item.quantity,
            ]);

            const queryOrderSize = `
          INSERT INTO order_size (id_size, id_order, quantity)
          VALUES ?
        `;

            connection.query(queryOrderSize, [orderItems], (err) => {
              if (err)
                return res
                  .status(500)
                  .json({ message: "Errore salvataggio articoli", err });
              const subject = "Conferma ordine - bool_shop";
              const text = `Grazie per il tuo ordine, ${name} ${surname}!`;
              const html = `
            <h2>Oridne del cliente ${name} ${surname}</h2>
            <p>nome articolo: ${items[0].model}</p>
            <p>taglia articolo: ${items[0].size}</p>
            <p>quantità articolo: ${items[0].quantity}</p>
            <p>prezzo articolo: ${items[0].price}</p>
            <p>Totale ordine: <strong>€${total_price.toFixed(2)}</strong></p>
           
          `;

              sendEmail(process.env.EMAIL_USER, subject, text, html);

              const userSubject = "Conferma ordine - bool_shop";
              const userText = `Grazie per il tuo ordine, ${name} ${surname}!`;
              const userHtml = `
            <h2>Ciao ${name} ${surname},</h2>
            <p>Grazie per il tuo ordine!</p>
           <p>nome articolo: ${items[0].model}</p>
            <p>taglia articolo: ${items[0].size}</p>
            <p>quantità articolo: ${items[0].quantity}</p>
            <p>prezzo articolo: ${items[0].price}</p>
            <p>Totale ordine: <strong>€${total_price.toFixed(2)}</strong></p>
            <p>Riceverai una email con i dettagli della spedizione.</p>
          `;

              sendEmail(email, userSubject, userText, userHtml, () => {
                return res.status(201).json({
                  message: "Ordine completato con successo",
                  id_order,
                  total_price,
                });
              });
            });
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
