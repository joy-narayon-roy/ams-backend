const router = require("express").Router();
const { user: userController } = require("../controllers");
const { check_auth } = require("../middleware");

router.get("/", check_auth, userController.getUser);

module.exports = router;
