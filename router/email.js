const router = require("express").Router();
const { email: emailController } = require("../controllers");

router.get("/:id", emailController.getEmailById);
router.post("/", emailController.createEmail);
router.patch("/:id", emailController.updateEmail);
router.delete("/:id", emailController.deleteEmail);
router.get("/", emailController.getEmail);

module.exports = router;
