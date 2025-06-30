require("dotenv");
const port = process.env.APP_PORT;
const url = process.env.APP_URL;
const express = require("express");
const app = express();

const sneakerRouter = require("./routers/sneakers.js");
const errorHandler = require("./middleware/errorhandler.js");
const cors = require("cors");

const errorNotFound = require("./middleware/errorNotFound.js");

//STATIC ASSEST
app.use(cors({ origin: `${url}:5173` }));
app.use(express.static("public"));
app.use(express.json());
//ROUTERS
app.use("/sneaker", sneakerRouter);

//MIDDLEWARE
app.use(errorHandler);
app.use(errorNotFound);
// IL SERVER E IN ASCOLTO SULLA PORTA 3000
app.listen(port, () => {
  console.log("il server è in ascolto sulla porta " + port);
});
