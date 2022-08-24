require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to HOL back-end Rest API." });
});

require("./app/routes/routes.js")(app);

// set port, listen for requests
const PORT = process.env.SERVER_PORT || 8080;
const HOST = process.env.SERVER_HOST || "0.0.0.0"
app.listen(PORT, HOST, () => {
  console.log(`Server is running on port ${PORT}.`);
});
