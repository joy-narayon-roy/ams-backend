const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const allowedOrigins = [
  "https://mydemoams.netlify.app",
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
  methods: ["GET", "POST"],
  // credentials: true
};
const middleware = [
  morgan("dev"),
  express.json(),
  express.urlencoded({ extended: true }),
  cors(corsConfigs),
];

// if (PROCESS_TYPE) {
//   middleware.push(cors({}));
// }

module.exports = middleware;
