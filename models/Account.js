const mongoose = require("mongoose");

const accountsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      default: null,
    },
    user_name: {
      type: String,
      required: true,
    },
    phone: {
      type: mongoose.Types.ObjectId,
      default: null,
    },
    phone_number: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      enum: ["GMAIL", " "],
    },
  },
  {
    timestamps: true,
  }
);

const Account = mongoose.model("Account", accountsSchema);

module.exports = Account;
