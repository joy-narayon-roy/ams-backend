const services = require("../../services");
/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
async function getAccount(req, res, next) {
  try {
    return res.status(200).send("W");
  } catch (e) {
    next(e);
  }
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
async function getAccountById(req, res, next) {
  try {
    return res.status(200).send("W");
  } catch (e) {
    next(e);
  }
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
async function createAccount(req, res, next) {
  try {
    return res.status(200).send("W");
  } catch (e) {
    next(e);
  }
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
async function updateAccount(req, res, next) {
  try {
    return res.status(200).send("W");
  } catch (e) {
    next(e);
  }
}

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
async function deleteAccount(req, res, next) {
  try {
    return res.status(200).send("W");
  } catch (e) {
    next(e);
  }
}

module.exports = {
  getAccount,
  getAccountById,
  createAccount,
  updateAccount,
  deleteAccount,
};
