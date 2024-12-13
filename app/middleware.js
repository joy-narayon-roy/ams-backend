const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const corsConfigs = {};
const PROCESS_TYPE = process.env.TYPE;
const middleware = [
  morgan("dev"),
  express.json(),
  express.urlencoded({ extended: true }),
  // cors(),
];

if (PROCESS_TYPE) {
  middleware.push(cors({}));
}

module.exports = middleware;
