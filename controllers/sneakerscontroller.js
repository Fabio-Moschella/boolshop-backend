const connection = require("../data/db.js");
// INDEX

const indexAll = (req, res) => {
  const sqlSneaker = "SELECT * FROM sneakers";

  connection.query(sqlSneaker, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });

    res.json({
      results,
    });
  });
};

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

//SHOW

const show = (req, res) => {
  const model = decodeURIComponent(req.params.model);
  const brand = decodeURIComponent(req.params.brand);

  const sqlSneaker = "SELECT * FROM sneakers WHERE brand = ?  AND model = ? ";
  connection.query(sqlSneaker, [brand,model], (err, results) => {


    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0)
      return res.status(404).json({ error: "sneaker not found" });
    res.json({
      results,
    });
  });
};

const postPopUp =(req,res) =>{


  const {name ,surname, email} = req.body

  let errors =[]

  if(!name){errors.push({message:"controlla i dati immessi nel campo nome"})}

  if(!surname){errors.push({message:"controlla i dati immessi nel campo cognome"})}

  if(!email){errors.push({message:"controlla i dati immessi nel campo e-mail"})}
if (errors.length){return res.status(400).json(errors)}


const queryPopUp = `INSERT INTO data_popup (name,surname,email) VALUES(?, ?, ?)`

connection.query(queryPopUp,[name,surname,email],(err,results) =>{
   if (err) return res.status(500).json({ message: "Errore del server", err });
   res.status(201).json({message:"Dati ricevuti correttamente"})
   console.log(results);
   
   
})
}

module.exports = { indexAll, indexLatest, indexCheapest, show , postPopUp };

