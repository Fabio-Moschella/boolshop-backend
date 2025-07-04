const express = require("express");
const sneaker = express.Router();
const sneakersController = require("../controllers/sneakerscontroller.js");

// ROUTE LISTA DELLE SCARPE(INDEXALL)

sneaker.get("", sneakersController.indexAll);

// ROUTE LISTA ULTIMI 5 ARRIVI(INDEXLATEST)

sneaker.get("/latest", sneakersController.indexLatest);

// MOSTRA ULTIMO ARRIVO PER LA HERO

sneaker.get("/showlast", sneakersController.latestForHero);

// ROUTE LISTA 5 SCARPE ECONOMICHE(INDEXCHEAPEST)

sneaker.get("/cheapest", sneakersController.indexCheapest);

// ROUTE MOSTRA DETTAGLIO SCARPA (SHOW)

sneaker.get("/:slug", sneakersController.show);

// ROUTE PER POP-UP DI BENVENUTO

sneaker.post("/popup", sneakersController.postPopUp);

// ROUTE PER DATI FATTURAZIONE CHECKOUT

sneaker.post(
  "/checkoutdata",
  sneakersController.postCheckOut
);

// ricerca
sneaker.get("", sneakersController.search);
module.exports = sneaker;
