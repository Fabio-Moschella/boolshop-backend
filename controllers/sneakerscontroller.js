const connection = require("../data/db.js");
// INDEX

const index = (req, res) => {
  const sqlSneaker = "SELECT * FROM sneakers";

  connection.query(sqlSneaker, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
  });
};

//SHOW

const show = (req, res) => {
  const id = parseInt(req.params.id);

  const sqlSneaker = "SELECT * FROM sneakers WHERE id = ?";
  connection.query(sqlSneaker, [id], (err, results) => {
    // Qui ho i risultati

    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0)
      return res.status(404).json({ error: "sneaker not found" });
  });
};

module.exports = { index, show };
