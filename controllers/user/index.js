const { user: userServices } = require("../../services");
const { createError } = require("../../utilities");

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
async function getUser(req, res, next) {
  try {
    const user_id = req.user_id;
    const user = await userServices.getUser("_id", user_id);

    if (!user) {
      throw createError("User not found.", 404);
    }

    delete user._doc.password;
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
}

module.exports = { getUser };
