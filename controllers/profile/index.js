const services = require("../../services");

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function get_profile(req, res, next) {
  try {
    /**
     * @type {import('firebase-admin').auth.DecodedIdToken|null}
     */
    const user = req.user;
    const profile = await services.profile.find_or_create(user.uid);

    res.status(200).json(profile);
  } catch (err) {
    next(err);
  }
}
module.exports = { get_profile };
