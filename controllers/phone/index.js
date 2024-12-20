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
    const { user_name, number, registered_by } = req.query;

    if (!user_name && !number && !registered_by) {
      const phones = await service.phone.getPhone();
      return res.status(200).json(phones);
    }

    let queyObj = {
      user_name,
      number,
      registered_by,
    };

    queyObj = Object.entries(queyObj)
      .filter((v) => v[1])
      .reduce((pre, cur) => {
        pre[cur[0]] = cur[1];
        return pre;
      }, {});

    const phones = await service.phone.getPhone("o", queyObj);
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
    const { id } = req.params;
    const phone = await service.phone.getPhone("_id", id);
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
async function postPhoneById(req, res, next) {
  try {
    const { number, registered_by, user_name, active } = req.body;
    if (!number || !registered_by || !user_name) {
      throw createError("Provide valid data.", 400);
    }
    const phone_exist = await service.phone.getPhone("number", number);

    if (phone_exist.length > 0) {
      throw createError("Phone already exist.", 400);
    }
    const { user_id } = req;
    const new_phone = await service.phone.createPhone(user_id, {
      number,
      registered_by,
      user_name,
      active,
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
    const { id } = req.params;
    const { user_name, number, registered_by, active } = req.body;

    if (number) {
      const exist_phone = await service.phone.getPhone("number", number);
      if (exist_phone.length > 0) {
        throw createError("Number already exist.", 400);
      }
    }

    const phone = await Phone.findById(id);
    if (!phone) {
      throw createError("Phone not found", 404);
    }

    phone.number = number ? number : phone.number;
    phone.registered_by = registered_by ? registered_by : phone.registered_by;
    phone.user_name = user_name ? user_name : phone.user_name;
    phone.active = active == true || active == false ? active : phone.active;

    await phone.save();

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
    const { id } = req.params;

    if (!id) {
      throw createError("Provide a valid id.", 400);
    }

    const data = await service.phone.deletePhoneById(id);
    return res.status(200).json(data);
  } catch (e) {
    next(e);
  }
}

module.exports = {
  getPhones,
  getPhoneById,
  postPhoneById,
  updatePhoneById,
  deletePhoneById,
};
