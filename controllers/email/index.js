const { email: emailServices } = require("../../services");
const { createError } = require("../../utilities");

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
async function getEmail(req, res, next) {
  try {
    const email = await emailServices.getEmail().populate("phone");
    return res.status(200).json(email);
  } catch (e) {
    next(e);
  }
}

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
async function getEmailById(req, res, next) {
  try {
    const { id } = req.params;
    const email = await emailServices.getEmail("_id", id);
    return res.status(200).json(email);
  } catch (e) {
    next(e);
  }
}

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
async function createEmail(req, res, next) {
  try {
    const { address, password, phone_number, type, user_name, ref } = req.body;

    if (!address || !password || !phone_number || !user_name) {
      throw createError("Provide vaild infomation to create email.", 400);
    }

    const email = await emailServices.createEmail(
      {
        user_name,
        address,
        password,
        phone_number,
        type:
          type ?? address.split("@").reverse()[0].split(".")[0].toUpperCase(),
      },
      ref,
      req.user_id
    );
    return res.status(200).json(email);
  } catch (e) {
    next(e);
  }
}

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
async function updateEmail(req, res, next) {
  try {
    const { id } = req.params;
    const { address, password, phone_number, type, user_name } = req.body;
    const email = await emailServices.updateEmail(id, {
      address,
      password,
      phone_number,
      type,
      user_name,
    });
    return res.status(200).json(email);
  } catch (e) {
    next(e);
  }
}

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
async function deleteEmail(req, res, next) {
  try {
    const { id } = req.params;
    const email = await emailServices.deleteEmail(id);
    return res.status(200).json(email);
  } catch (e) {
    next(e);
  }
}

module.exports = {
  getEmail,
  getEmailById,
  createEmail,
  updateEmail,
  deleteEmail,
};
