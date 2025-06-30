const express = require("express");
const sneaker = express.Router();
const sneakersController = require("../controllers/sneakerscontroller.js");
// ROUT LISTA DEI FILM(INDEX)
sneaker.get("", sneakersController.index);
// ROUT PER I DETTAGLI DEL FILM(SHOW)
sneaker.get("/:id", sneakersController.show);

module.exports = sneaker;
