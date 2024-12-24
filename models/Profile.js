const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: [true, "Profile already exist!"],
  },
  pin: {
    type: Number,
    default: null,
    // unique: [true, "Provide pin!"],
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
});

// profileSchema.pre('save',(next)=>{
//   console.log('\nprofile on save\n');
//   next()
// })

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
