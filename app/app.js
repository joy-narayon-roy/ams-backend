const path = require("path");
const express = require("express");
const { notFoundHandler, errorHandler } = require("./error");

const app = express();
app.use(require("./middleware"));
app.use(require("../router"));
app.use(express.static(path.join(__dirname, "../public")));
app.use(notFoundHandler);
app.use(errorHandler);
module.exports = app;
