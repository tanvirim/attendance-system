const router = require("express").Router();
const userController = require("../controller/user");

router.get("/", userController.getUsers);

router.post("/", userController.postUsers);

router.get("/:userId", userController.getUserById);

router.delete("/:userId", userController.deleteUserById);

router.patch("/:userId", userController.patchUserById);

router.put("/:userId", userController.putUserById);

module.exports = router;
