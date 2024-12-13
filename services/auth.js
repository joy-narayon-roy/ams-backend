const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { createError } = require("../utilities");

async function login({ email, password }) {
  const user = await User.findOne({ email })
    .populate("phones")
    .populate("emails")
    .populate("accounts");

  if (!user) {
    throw createError("Invalid infomation", 400);
  }
  const isValid = await bcrypt.compare(password, user.password);
  delete user._doc.password;

  if (isValid) {
    return {
      user,
      // token: jwt.sign({ ...user }, process.env.JWT_KEY, { expiresIn: "5h" }),
      token: jwt.sign({ id: user.id }, process.env.JWT_KEY),
    };
  } else {
    throw createError("Invalid infomation", 400);
  }
}

async function signup({ email, name, password, pin }) {
  const exist_email = await User.findOne({
    email,
  });
  if (exist_email) {
    throw createError("User already exist.", 400);
  }
  const salt = await bcrypt.genSalt(Number(process.env.HASH_SALT_ROUND));
  const user = new User({
    email,
    name,
    password: await bcrypt.hash(password, salt),
    pin,
  });

  await user.save();
  delete user._doc.password;

  return {
    user,
    token: jwt.sign({ id: user.id }, process.env.JWT_KEY),
  };
}

module.exports = { login, signup };
