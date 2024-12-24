const path = require("path");
const express = require("express");
const { auth: firebase_auth } = require("./firebase");
const { notFoundHandler, errorHandler } = require("./error");

const app = express();
app.use(require("./middleware"));
app.use(require("../router"));
app.use(express.static(path.join(__dirname, "../public")));
app.use(notFoundHandler);
app.use(errorHandler);
app.firebase_auth = firebase_auth;
module.exports = app;
