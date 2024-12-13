const mongoose = require("mongoose");

/**
 *
 * @param {string} uri
 * @param {import('mongoose').ConnectOptions} options
 * @returns
 */
function connectDB(uri, options) {
  return mongoose.connect(uri, options);
}

module.exports = connectDB;
