const path = require("path");
const router = require("express").Router();
const { check_auth } = require("../middleware");

router.use("/api/phone", check_auth, require("./phones"));
router.use("/api/email", check_auth, require("./email"));
router.use("/api/user", require("./user"));
router.use("/api", require("./authRouter"));

router.get("/health", (req, res, next) => {
  res.status(200).json({
    message: "💖🩺Looks good🩺💖",
  });
});

module.exports = router;
