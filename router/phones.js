const router = require("express").Router();
const controller = require("../controllers");

router.get("/:id", controller.phone.getPhoneById);
router.post("/", controller.phone.postPhone);
router.patch("/:id", controller.phone.updatePhoneById);
router.delete("/:id", controller.phone.deletePhoneById);
router.get("/", controller.phone.getPhones);

module.exports = router;
