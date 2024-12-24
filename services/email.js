const { default: mongoose } = require("mongoose");
const { createError } = require("../utilities");
const Email = require("../models/Email");
const Phone = require("../models/Phone");
const Profile = require("../models/Profile");

/**
 *
 * @param {string} author
 * @param {object} filter
 */
async function getEmails(author, filter = {}) {
  if (!author) {
    throw createError("Provide Author(uid)", 400);
  }

  if (!filter) {
    const emails = await Email.find({
      author,
    }).populate("phone");
    return emails;
  }

  if (Object.hasOwn(filter, "id")) {
    filter["_id"] = filter.id;
    delete filter.id;
  }

  if (Object.hasOwn(filter, "_id")) {
    const email = await Email.findById(filter["_id"]);
    if (email && email.author === author) {
      await email.populate("phone");
      return [email];
    }
    return [];
  }

  filter = Object.entries(filter)
    .filter(([k, v]) => v)
    .reduce((pre, [k, v]) => {
      pre[k] = v;
      return pre;
    }, {});

  const emails = await Email.find({
    author,
    ...filter,
  }).populate("phone");
  return emails;
}

async function createEmail(
  author,
  { user_name, address, password, phone_ref, phone_number, type, description }
) {
  const existEmail = await Email.findOne({
    author,
    address,
  });

  if (existEmail) {
    throw createError(`${address} already exists.`, 400);
  }

  // TODO:
  if (!phone_ref && phone_number) {
    const phone = await Phone.findOne({ author, number: phone_number });
    phone_ref = phone ? phone.id : phone_ref;
  }

  if (phone_ref && !mongoose.Types.ObjectId.isValid(phone_ref)) {
    throw createError("Invalid phone ref!", 400);
  }

  const email = new Email({
    user_name,
    address,
    password,
    author,
    type,
    description,
    phone: phone_ref ? phone_ref : null,
    phone_number: phone_ref ? null : phone_number,
  });

  await email.save();

  await Profile.findOneAndUpdate(
    { uid: author },
    {
      $addToSet: { emails: email.id },
    }
  );

  return email;
}

async function updateEmail(
  author,
  id,
  { user_name, address, password, phone_ref, phone_number, type, description }
) {
  // TODO: work on it.
  const email = await Email.findOne({ _id: id, author });
  if (!email) {
    throw createError("Email not found!", 400);
  }

  if (user_name && user_name !== email.user_name) {
    email.user_name = user_name;
  }
  if (password && password !== email.password) {
    email.password = password;
  }
  if (type && type !== email.type) {
    email.type = type;
  }
  if (description && description !== email.description) {
    email.description = description;
  }
  if (address && address !== email.address) {
    const existEmail = await Email.findOne({ address, author });
    if (existEmail) {
      throw createError(`${address} already exist.`, 400);
    }
    email.address = address;
  }

  if (phone_ref) {
    if (!mongoose.Types.ObjectId.isValid(phone_ref)) {
      throw createError(`${phone_ref} is invalid`);
    }
    if (email.phone instanceof mongoose.Types.ObjectId) {
      if (email.phone != phone_ref) {
        email.phone = phone_ref;
      }
    } else if (email.phone instanceof Phone) {
      if (email.phone.id != phone_ref) {
        email.phone = phone_ref;
      }
    }
  }

  ///*
  if (phone_number && phone_number !== email.phone_number) {
    if (email.phone) {
      await email.populate("phone");
      const currentNumber = email.phone.number;
      if (currentNumber !== phone_number) {
        const existPhone = await Phone.findOne({
          author,
          number: phone_number,
        });
        if (existPhone) {
          email.phone = existPhone.id;
          email.phone_number = null;
        } else {
          email.phone = null;
          email.phone_number = phone_number;
        }
      }
    } else {
      const existPhone = await Phone.findOne({ author, number: phone_number });
      if (existPhone) {
        email.phone = existPhone.id;
        email.phone_number = null;
      } else {
        email.phone_number = phone_number;
      }
    }
  }
  //*/

  await email.save();
  return email;
}

async function deleteEmail(author, id) {
  if (!author || !id) {
    throw createError("Provide author(uid) and id.", 400);
  }
  const isValidId = mongoose.Types.ObjectId.isValid(id);
  if (!isValidId) {
    throw createError("Invalid Phone ID. Failed to delete.", 400);
  }

  const deletedEmail = await Email.findOneAndDelete({
    _id: id,
    author,
  });

  if (deletedEmail) {
    await Profile.findOneAndUpdate(
      { uid: author },
      {
        $pull: {
          emails: id,
        },
      }
    );
  }

  return deletedEmail;
}

module.exports = { getEmails, createEmail, updateEmail, deleteEmail };
