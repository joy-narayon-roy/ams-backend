const mongoose = require("mongoose");

const phoneSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: [true, "User name required!"],
  },

  number: {
    type: String,
    maxlength: [14, "Number too much long. Must be in 14 characters."],
    // minlength: 11,

    required: [true, "Phone number required!"],
  },

  registered_by: {
    type: String,
    required: [true, "Registered by required!"],
  },

  active: {
    type: Boolean,
    default: true,
  },

  description: {
    type: String,
    default: "",
  },
  author: {
    type: String,
    required: [true, "Phone author(uid) required!"],
  },
});

// phoneSchema.pre("save", async function (next) {
//   const { author, number } = this;
//   const exist = await Phone.findOne({ author, number });
//   if (exist) {
//     next(
//       createError(`${this.number} already exist! Phone id ${exist.id}`, 400)
//     );
//   } else {
//     next();
//   }
// });

const Phone = mongoose.model("Phone", phoneSchema);

module.exports = Phone;
