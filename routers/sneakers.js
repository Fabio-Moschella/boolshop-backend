const express = require("express");
const sneaker = express.Router();
const sneakersController = require("../controllers/sneakerscontroller.js");
// ROUT LISTA DELLE SCARPE(INDEX)
sneaker.get("", sneakersController.index);
// ROUT MOSTRA DETTAGLIO SCARPA (SHOW)
sneaker.get("/:id", sneakersController.show);

module.exports = sneaker;
