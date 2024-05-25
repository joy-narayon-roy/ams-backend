const mongoose = require("mongoose");

const phoneSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
  },
  registered_by: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  number: {
    type: String,
    unique: true,
    maxlength: 14,
    minlength: 11,
    required: true,
  },
  accounts: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
});

const Phone = mongoose.model("Phone", phoneSchema);

module.exports = Phone;
