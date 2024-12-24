const { createError } = require("../utilities");
const jwt = require("jsonwebtoken");
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
async function is_valid_user(req, res, next) {
  try {
    /**
     * @type {import('firebase-admin').auth.Auth}
     */
    const firebase_auth = req.app.firebase_auth;
    const { authorization } = req.headers;
    if (!authorization) {
      throw createError("Provide a valid token", 401);
    }
    if (!authorization.startsWith("Bear ")) {
      throw createError("Provide a valid token", 401);
    }
    const token = authorization.split(" ")[1];

    try {
      const user = await firebase_auth.verifyIdToken(token);
      req.user = user;
    } catch (err) {
      throw createError("Invalid token", 401);
    }

    next();
  } catch (e) {
    next(e);
  }
}
module.exports = is_valid_user;
