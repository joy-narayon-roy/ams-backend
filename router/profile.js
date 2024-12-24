const router = require("express").Router();
const controller = require("../controllers");

router.get("/", controller.profile.get_profile);

module.exports = router;
