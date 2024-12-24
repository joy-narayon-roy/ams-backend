const mongoose = require("mongoose");
const { Profile } = require("../models");
const { createError } = require("../utilities");

async function get_profile_by_uid(uid) {
  if (!uid) {
    return null;
  }
  const profile = await Profile.find({ uid });
  return profile;
}

async function find_or_create(uid, pin = null) {
  if (!uid) {
    throw createError("Provide valid uid", 400);
  }

  const existProfile = await Profile.findOne({ uid })
    .populate("phones")
    .populate("emails");
  if (existProfile) {
    return existProfile;
  }
  const newProfile = new Profile({
    uid,
    pin,
  });
  await newProfile.save();
  return newProfile;
}

module.exports = { get_profile_by_uid, find_or_create };
