const express = require("express");
const sneaker = express.Router();
const sneakersController = require("../controllers/sneakerscontroller.js");

// ROUTE LISTA DELLE SCARPE(INDEXALL)

sneaker.get("", sneakersController.indexAll);

// ROUTE LISTA ULTIMI 5 ARRIVI(INDEXLATEST)

sneaker.get("/Latest", sneakersController.indexLatest);

// ROUTE LISTA 5 SCARPE ECONOMICHE(INDEXCHEAPEST)

sneaker.get("/Cheapest", sneakersController.indexCheapest);

// ROUTE MOSTRA DETTAGLIO SCARPA (SHOW)

sneaker.get("/:brand/:model", sneakersController.show);

// ROUTE PER POP-UP DI BENVENUTO

sneaker.post("/popup",sneakersController.postPopUp)

// ROUTE PER DATI FATTURAZIONE CHECKOUT

sneaker.post("/checkoutdata",sneakersController.postCheckOut)

module.exports = sneaker;
