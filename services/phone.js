const { User } = require("../models");
const Phone = require("../models/Phone");

function getPhone(key, value) {
  if (key == "_id") {
    return Phone.findById(value);
  } else if (key == "o") {
    return Phone.find(value);
  } else {
    return Phone.find(key && value && { [key]: value });
  }
}

async function createPhone(
  user_id,
  { user_name, registered_by, number, active }
) {
  const phone = new Phone({
    // user,
    user_name,
    registered_by,
    // accounts,
    number,
    active,
  });
  await phone.save();
  await User.findByIdAndUpdate(user_id, {
    $push: { phones: phone },
  });
  return phone;
}

function updatePhone(id, obj) {}

function deletePhoneById(id) {
  return Phone.findByIdAndDelete(id);
}

module.exports = { getPhone, createPhone, deletePhoneById, updatePhone };
