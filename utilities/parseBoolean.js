const falseValues = [
  null,
  "null",
  0,
  "0",
  false,
  "false",
  undefined,
  "undefined",
  "off",
];
const trueValues = [1, "1", true, "true", "on"];

function parseBoolean(value, defaultValue = false) {
  if (falseValues.includes(value)) {
    return false;
  } else if (trueValues.includes(value)) {
    return true;
  }
  return defaultValue;
}

module.exports = parseBoolean;
