const router = require("express").Router();
const adminController = require("../controller/admin-attendance");

router.get("/enable", adminController.getEnable);
router.get("/disble", adminController.getDisable);

module.exports = router;
