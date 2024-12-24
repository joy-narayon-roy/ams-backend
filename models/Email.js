const { Schema, model } = require("mongoose");

const emailSchema = new Schema({
  user_name: {
    type: String,
    required: true,
    maxlength: [30, "User name too long. Must be in 30 characters."],
  },
  address: {
    type: String,
    required: [true, "Provied Email address."],
  },
  type: {
    type: String,
    // enum: ["GMAIL", "EMAIL", "YAHOO", "HOTMAIL", "OUTLOOK"],
    // required: [true, "Provide Email type."],
    default: null,
  },
  phone: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: "Phone",
  },
  phone_number: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    required: [true, "Provide email password."],
  },
  description: {
    type: String,
    default: "",
  },
  author: {
    type: String,
    required: [true, "Email author(uid) required!"],
  },
});
const Email = model("Email", emailSchema);

module.exports = Email;
