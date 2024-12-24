const { default: mongoose } = require("mongoose");
const { Profile } = require("../models");
const { Phone } = require("../models");
const { createError, parseBoolean } = require("../utilities");

/**
 *
 * @param {string} author
 * @param {object} filter
 */
async function getPhones(author, filter = {}) {
  if (!author) {
    throw createError("Provide Author(uid)", 400);
  }

  if (!filter) {
    const phones = await Phone.find({
      author,
    });
    return phones;
  }

  if (Object.hasOwn(filter, "id")) {
    filter["_id"] = filter.id;
    delete filter.id;
  }

  if (Object.hasOwn(filter, "_id")) {
    const phone = await Phone.findById(filter["_id"]);
    if (phone && phone.author === author) {
      return [phone];
    }
    return [];
  }

  const allowToFilter = [
    "user_name",
    "active",
    "number",
    "registered_by",
    "description",
  ];

  filter = Object.entries(filter)
    .filter(([k, v]) => v)
    .reduce((pre, [k, v]) => {
      pre[k] = v;
      return pre;
    }, {});

  const phones = await Phone.find({
    author,
    ...filter,
  });

  return phones;
}

/**
 *
 * @param {string} author
 * @param {string} number
 */
async function searchByNumber(author, number = "") {
  if (!author) {
    throw createError("Provide Author(uid)", 400);
  }
  const phones = await Phone.find({
    author,
    number: {
      $regex: number,
      $options: "i",
    },
  });

  return phones;
}

async function createPhone(
  author,
  { user_name, registered_by, number, active, description }
) {
  const existPhone = await Phone.findOne({ author, number });

  if (existPhone) {
    // return existPhone;
    throw createError(`${number} already exists.`, 400);
  }

  const phone = new Phone({
    user_name,
    registered_by,
    number,
    active,
    description,
    author,
  });
  await phone.save();
  await Profile.findOneAndUpdate(
    { uid: author },
    {
      $addToSet: { phones: phone.id },
    }
  );
  return phone;
}

async function updatePhone(author, id, updatedObj = {}) {
  if (!author) {
    throw createError("Provide Author(uid)", 400);
  }

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    throw createError("Invalid Phone id. Faild to update.", 400);
  }

  if (!updatedObj || !(updatedObj instanceof Object)) {
    throw createError("Provide valid data to update.", 400);
  }

  const allowToUpdate = [
    "user_name",
    "active",
    "number",
    "registered_by",
    "description",
  ];
  const booleanState = ["active"];

  let updatedObjEntries = Object.entries(updatedObj).filter(([key, value]) => {
    if (allowToUpdate.includes(key) && value !== undefined) {
      return true;
    }
    return false;
  });

  updatedObjEntries = updatedObjEntries.map(([key, value]) => {
    if (booleanState.includes(key)) {
      return [key, parseBoolean(value)];
    }
    return [key, value];
  });
  const updateWith = updatedObjEntries.reduce((pre, [key, val]) => {
    pre[key] = val;
    return pre;
  }, {});

  if (Object.keys(updateWith).length === 0) {
    return null;
  }

  if (Object.hasOwn(updateWith, "number")) {
    const exist = await Phone.findOne({
      author,
      number: updateWith.number,
    });
    if (exist) {
      delete updateWith.number;
    }
  }

  const updatedData = await Phone.findByIdAndUpdate(id, updateWith, {
    new: true,
  });
  return updatedData;
}

async function deletePhoneById(author, id) {
  if (!author || !id) {
    throw createError("Provide author(uid) and id.", 400);
  }
  const isValidId = mongoose.Types.ObjectId.isValid(id);
  if (!isValidId) {
    throw createError("Invalid Phone ID. Failed to delete.", 400);
  }
  const deletedPhone = await Phone.findOneAndDelete({
    _id: id,
    author,
  });
  if (deletedPhone) {
    await Profile.findOneAndUpdate(
      { uid: author },
      {
        $pull: {
          phones: id,
        },
      }
    );
  }
  return deletedPhone;
}

module.exports = {
  getPhones,
  searchByNumber,
  createPhone,
  deletePhoneById,
  updatePhone,
};
