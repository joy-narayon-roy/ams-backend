const router = require("express").Router();

const { account: accountController } = require("../controllers");

router.get("/:id", accountController.getAccountById);
router.patch("/:id", accountController.updateAccount);
router.delete("/:id", accountController.deleteAccount);
router.get("/", accountController.getAccount);
router.post("/", accountController.createAccount);

// router.get("/", (req, res) => {
//   res.status(200).json({
//     message: "OK",
//   });
// });

module.exports = router;
