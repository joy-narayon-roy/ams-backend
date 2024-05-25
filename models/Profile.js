const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({});
const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
