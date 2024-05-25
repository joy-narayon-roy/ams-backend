const router = require("express").Router();
const { auth: authController } = require("../controllers");

router.post("/login", authController.loginPostController);
router.post("/signup", authController.signupPostController);

module.exports = router;
