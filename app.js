const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const { API_VERSION } = require("./config");

//Load routing
const userRoutes = require('./routers/user');
const productoRoutes = require('./routers/producto');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//configure header HTTP

//Rputer Basic
app.use(`/api/${API_VERSION}`, userRoutes, productoRoutes);

module.exports = app;

