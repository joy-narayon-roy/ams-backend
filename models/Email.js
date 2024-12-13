const { Schema, model } = require("mongoose");

const emailSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      default: null,
    },
    user_name: {
      type: String,
      required: true,
      maxlength: [30, "User name too long."],
    },
    address: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      // enum: ["GMAIL", "EMAIL", "YAHOO", "HOTMAIL", "OUTLOOK"],
      required: true,
    },
    phone: {
      type: Schema.Types.ObjectId,
      default: null,
      ref: "Phone",
    },
    phone_number: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    accounts: {
      type: [Schema.Types.ObjectId],
      default: [],
      ref: "Account",
    },
  },
  { timestamps: true }
);
const Email = model("Email", emailSchema);

module.exports = Email;
