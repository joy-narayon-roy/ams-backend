const { auth: authServices } = require("../../services");
const { createError } = require("../../utilities");
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
async function loginPostController(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw createError("Provide valid infomation to login.", 400);
    }
    const token = await authServices.login({ email, password });
    return res.status(200).json({
      message: "Loggedin",
      ...token,
    });
  } catch (e) {
    next(e);
  }
}

module.exports = loginPostController;
