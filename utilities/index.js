const parseBoolean = require("./parseBoolean");
function createError(msg, status) {
  const e = new Error(msg);
  e.status = status;
  return e;
}
module.exports = { createError, parseBoolean };
