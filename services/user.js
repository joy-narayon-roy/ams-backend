const { User } = require("../models");
function createUser() {
  return "Done";
}

function getUser(key, value) {
  if (key == "_id") {
    return User.findById(value)
      .populate("phones")
      .populate("emails")
      .populate("accounts");
  } else if (key == "o") {
    return User.find(value)
      .populate("phones")
      .populate("emails")
      .populate("accounts");
  } else if (key == "oo") {
    return User.findOne(value)
      .populate("phones")
      .populate("emails")
      .populate("accounts");
  } else {
    return User.find(key && value && { [key]: value });
  }
}

module.exports = { createUser, getUser };
