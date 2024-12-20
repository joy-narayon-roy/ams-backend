const mongoose = require("mongoose");

const errorSchema = new mongoose.Schema(
  {
    status: Number,
    ip: {
      type: String,
      default: null,
    },
    path: {
      type: String,
      default: null,
    },
    method: {
      type: String,
      default: null,
    },
    headers: {
      type: Object,
      default: {},
    },
    body: {
      type: Object,
      default: null,
    },
    error: {
      type: Object,
    },
    resolved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const ServerError = mongoose.model("ServerError", errorSchema);

module.exports = ServerError;
