const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.put("/program/:email", userController.addProgramToUser);
router.put("/channel/:email", userController.addChannelToUser);
router.delete("/:email", userController.deleteUser);
router.get("/:email", userController.getUser);
router.post("/", userController.createUser);

module.exports = router;
