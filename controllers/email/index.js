const services = require("../../services");
const { createError } = require("../../utilities");

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
async function getEmail(req, res, next) {
  try {
    /**
     * @type {import('firebase-admin').auth.DecodedIdToken|undefined}
     */
    const user = req.user;
    if (!user) {
      throw createError("Please login", 401);
    }
    const author = user.uid;
    const {
      user_name,
      address,
      type,
      phone_ref,
      phone_number,
      password,
      description,
    } = req.query;

    const email = await services.email.getEmails(author, {
      user_name,
      address,
      type,
      phone_ref,
      phone_number,
      password,
      description,
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
async function getEmailById(req, res, next) {
  try {
    /**
     * @type {import('firebase-admin').auth.DecodedIdToken|undefined}
     */
    const user = req.user;
    if (!user) {
      throw createError("Please login", 401);
    }
    const author = user.uid;
    const { id } = req.params;
    const email = await services.email.getEmails(author, { id });
    return res.status(200).json(email.length > 0 ? email[0] : null);
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
    /**
     * @type {import('firebase-admin').auth.DecodedIdToken|undefined}
     */
    const user = req.user;
    if (!user) {
      throw createError("Please login", 401);
    }
    const author = user.uid;

    const { address, password, phone_number, phone_ref, type, user_name } =
      req.body;

    if (!address || !password || !phone_number || !user_name) {
      throw createError("Provide vaild infomation to create email.", 400);
    }

    const email = await services.email.createEmail(author, {
      address,
      password,
      phone_number,
      phone_ref,
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
async function updateEmail(req, res, next) {
  try {
    /**
     * @type {import('firebase-admin').auth.DecodedIdToken|undefined}
     */
    const user = req.user;
    if (!user) {
      throw createError("Please login", 401);
    }
    const author = user.uid;

    const allowToUpdate = [
      "address",
      "password",
      "phone_number",
      "phone_ref",
      "type",
      "user_name",
      "description",
    ];

    const req_body = Object.entries(req.body)
      .filter(([k, v]) => v && allowToUpdate.includes(k))
      .reduce((pre, [k, v]) => {
        pre[k] = v;
        return pre;
      }, {});

    if (Object.keys(req_body).length == 0) {
      throw createError("Provide info to update email.", 400);
    }

    const {
      address,
      password,
      phone_number,
      phone_ref,
      type,
      user_name,
      description,
    } = req_body;

    const { id } = req.params;
    const email = await services.email.updateEmail(author, id, {
      address,
      description,
      password,
      phone_number,
      phone_ref,
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
    /**
     * @type {import('firebase-admin').auth.DecodedIdToken|undefined}
     */
    const user = req.user;
    if (!user) {
      throw createError("Please login", 401);
    }
    const author = user.uid;

    const { id } = req.params;
    const email = await services.email.deleteEmail(author, id);
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
