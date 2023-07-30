const express = require("express");
const app = express();
const cors = require("cors");
const apiRoutes = require("./api");

app.use(express.static("public"));
app.use(cors());
app.use(express.json()); // Add this line to parse JSON data from requests

// Use the API routes and middleware
app.use("/api", apiRoutes);

var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var express = require('express')
var timeout = require('connect-timeout')

// example of using this top-level; note the use of haltOnTimedout
// after every middleware; it will stop the request flow on a timeout

app.use(timeout('5s'))
app.use(bodyParser())
app.use(haltOnTimedout)
app.use(cookieParser())
app.use(haltOnTimedout)

// Add your routes here, etc.

function haltOnTimedout (req, res, next) {
  if (!req.timedout) next()
}

app.listen(3000)


const port = 3000;
app.listen(port, () => {
  console.log("Running on port: " + port);
});
