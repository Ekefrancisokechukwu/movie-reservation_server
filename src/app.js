require("dotenv").config();
require("express-async-errors");

// express
const express = require("express");
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

// middleware
const notFoundMiddleware = require("./middleware/notFoundMiddleware");

app.use(notFoundMiddleware);

module.exports = app;
