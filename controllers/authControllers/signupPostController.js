const { auth: authServices } = require("../../services");
const { createError } = require("../../utilities");

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
async function signupPostController(req, res, next) {
  try {
    const { email, name, password, pin } = req.body;
    if (!email || !name || !password || !pin) {
      throw createError("Provide a valide infomation", 400);
    }
    const signupData = await authServices.signup({
      email,
      name,
      password,
      pin,
    });
    return res.status(201).json({
      ...signupData,
    });
  } catch (e) {
    next(e);
  }
}
module.exports = signupPostController;
