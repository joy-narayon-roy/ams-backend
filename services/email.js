const { createError } = require("../utilities");
const Email = require("../models/Email");
const Phone = require("../models/Phone");
const { User } = require("../models");

function getEmail(key, value) {
  if (key == "_id") {
    return Email.findById(value);
  } else if (key == "o") {
    return Email.find(value);
  } else {
    return Email.find(key && value && { [key]: value });
  }
}

async function createEmail(
  { user_name, address, password, phone_number, type },
  refs,
  user_id
) {
  const email_exist = await Email.findOne({
    address,
  });

  if (email_exist) {
    throw createError("Email already exist!", 400);
  }

  let phone = null;
  if (refs && refs.phone) {
    phone = refs.phone;
  } else {
    phone = await Phone.findOne({
      number: phone_number,
    });
    phone = phone ? phone.id : null;
  }

  const email = new Email({
    // user,
    user_name,
    // accounts,
    address,
    password,
    phone: phone ?? null,
    phone_number,
    type,
  });
  await email.save();
  await User.findByIdAndUpdate(user_id, { $push: { emails: email.id } });

  return email;
}

async function updateEmail(
  id,
  { address, password, phone_number, type, user_name }
) {
  const email = await Email.findById(id);
  if (!email) {
    throw createEmail("Email not exist", 404);
  }

  if (address) {
    const exist_email = await Email.findOne({
      address,
    });

    if (exist_email) {
      throw createError("Email already exist", 400);
    }
  }

  const phone = await Phone.findOne({ number: phone_number });

  email.user_name = user_name ? user_name : email.user_name;
  // console.log(address, " - ", email.address);
  email.address = address ? address : email.address;
  email.phone = phone ? phone.id : email.phone;
  email.phone_number = phone ? null : phone_number;
  email.password = password ? password : email.password;
  email.type = type ? type : email.type;

  return email.save();
}

function deleteEmail(id) {
  return Email.findByIdAndDelete(id);
}

module.exports = { getEmail, createEmail, updateEmail, deleteEmail };
