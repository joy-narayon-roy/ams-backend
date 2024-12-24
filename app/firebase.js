const admin = require("firebase-admin");
const getConfig = require("./firebaseConfig");

const app = admin.initializeApp({
  credential: admin.credential.cert(getConfig()),
});
const auth = admin.auth(app);

module.exports = {
  app,
  auth,
  admin,
};
