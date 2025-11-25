const router = require("express").Router();
const path = require("path")
const { is_valid_user } = require("../middleware");

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

router.get("/.well-known/appspecific/com.chrome.devtools.json", (req, res) => {
  return res.status(204).send();   // ignore silently
});


router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
