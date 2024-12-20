const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const allowedOrigins = [
  "https://mydemoams.netlify.app",
  "https://myams-39bda.web.app",
  "https://myams-39bda.firebaseapp.com",
  "http://localhost:5173",
];

const corsConfigs = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
const middleware = [
  morgan("dev"),
  express.json(),
  express.urlencoded({ extended: true }),
  cors(corsConfigs),
];

module.exports = middleware;
