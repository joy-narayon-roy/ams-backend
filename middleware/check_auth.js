const { createError } = require("../utilities");
const jwt = require("jsonwebtoken");
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
async function check_auth(req, res, next) {
  try {
    const { authorization: token } = req.headers;
    if (!token || !(token.length > 5)) {
      throw createError("Provide a valid token", 401);
    }
    const user_info = jwt.verify(token.split(" ")[1], process.env.JWT_KEY);
    req.user_id = user_info.id;
    next();
  } catch (e) {
    next(e);
  }
}
module.exports = check_auth;
