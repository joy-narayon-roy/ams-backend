const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    max: [30, "Name is too Long."],
    min: [3, "Name is too short."],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
      },
      message: (props) => `Invalid email!`,
    },
  },

  password: {
    type: String,
    required: true,
  },
  pin: {
    type: Number,
    required: true,
  },
  phones: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Phone",
    },
  ],
  emails: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Email",
    },
  ],
  accounts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
  ],
});
const User = mongoose.model("User", userSchema);
module.exports = User;
