const router = require("express").Router();
const { check_auth, is_valid_user } = require("../middleware");

router.use("/api/phone", is_valid_user, require("./phones"));
router.use("/api/email", is_valid_user, require("./email"));
// router.use("/api/user", require("./user"));
router.use("/api/profile", is_valid_user, require("./profile"));
router.use("/api", require("./authRouter"));

router.get("/health", (_req, res, next) => {
  res.status(200).json({
    message: "💖🩺Looks good🩺💖",
  });
});

module.exports = router;
