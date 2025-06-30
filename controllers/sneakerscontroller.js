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
  const id = parseInt(req.params.id);

  const sqlSneaker = "SELECT * FROM sneakers WHERE sneaker_id = ?";
  connection.query(sqlSneaker, [id], (err, results) => {
    // Qui ho i risultati

    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0)
      return res.status(404).json({ error: "sneaker not found" });
    res.json({
      results,
    });
  });
};

module.exports = { indexAll, indexLatest, indexCheapest, show };
