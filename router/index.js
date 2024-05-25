const router = require("express").Router();
const { check_auth } = require("../middleware");

router.use("/phone", check_auth, require("./phones"));
router.use("/email", check_auth, require("./email"));
router.use("/user", require("./user"));
router.use("/", require("./authRouter"));

router.get("/health", (req, res, next) => {
  res.status(200).json({
    message: "💖🩺Looks good🩺💖",
  });
});

module.exports = router;
