const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const middleware = [
  morgan("dev"),
  express.json(),
  express.urlencoded({ extended: true }),
  cors(),
];

module.exports = middleware;
