const Phone = require("../../models/Phone");
const service = require("../../services");
const { createError } = require("../../utilities");

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
async function getPhones(req, res, next) {
  try {
    const { user_name, number, registered_by, description } = req.query;
    /**
     * @type {import('firebase-admin').auth.DecodedIdToken|undefined}
     */
    const user = req.user;
    if (!user) {
      throw createError("Please login", 401);
    }
    const author = user.uid;

    if (!user_name && !number && !registered_by) {
      const phones = await service.phone.getPhones(author);
      return res.status(200).json(phones);
    }

    const phones = await service.phone.getPhones(author, {
      user_name,
      number,
      registered_by,
      description,
    });
    return res.status(200).json(phones);
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
async function getPhoneById(req, res, next) {
  try {
    /**
     * @type {import('firebase-admin').auth.DecodedIdToken|undefined}
     */
    const user = req.user;
    if (!user) {
      throw createError("Please login", 401);
    }

    const { id } = req.params;
    const author = user.uid;

    const phones = await service.phone.getPhones(author, { id });
    return res.status(200).json(phones.length == 0 ? null : phones);
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
async function postPhone(req, res, next) {
  try {
    /**
     * @type {import('firebase-admin').auth.DecodedIdToken|undefined}
     */
    const user = req.user;
    if (!user) {
      throw createError("Please login", 401);
    }

    const { number, registered_by, user_name, active, description } = req.body;
    if (!number || !registered_by || !user_name) {
      throw createError("Provide valid data.", 400);
    }

    const new_phone = await service.phone.createPhone(user.uid, {
      active,
      number,
      registered_by,
      user_name,
      description,
    });
    return res.status(200).json(new_phone);
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
async function updatePhoneById(req, res, next) {
  try {
    /**
     * @type {import('firebase-admin').auth.DecodedIdToken|undefined}
     */
    const user = req.user;
    if (!user) {
      throw createError("Please login", 401);
    }

    const { id } = req.params;

    const { user_name, number, registered_by, active, description } = req.body;

    const phone = await service.phone.updatePhone(user.uid, id, {
      user_name,
      number,
      registered_by,
      active,
      description,
    });

    return res.status(200).json(phone);
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
async function deletePhoneById(req, res, next) {
  try {
    /**
     * @type {import('firebase-admin').auth.DecodedIdToken|undefined}
     */
    const user = req.user;
    if (!user) {
      throw createError("Please login", 401);
    }

    const { id } = req.params;

    if (!id) {
      throw createError("Provide a valid id.", 400);
    }

    const data = await service.phone.deletePhoneById(user.uid, id);
    return res.status(200).json(data);
  } catch (e) {
    next(e);
  }
}

module.exports = {
  getPhones,
  getPhoneById,
  postPhone,
  updatePhoneById,
  deletePhoneById,
};
