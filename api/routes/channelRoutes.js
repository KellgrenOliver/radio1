const express = require("express");
const router = express.Router();

const channelController = require("../controllers/channelController");

router.get("/schedule/:channelId", channelController.getChannelSchedule);
router.get("/favorites/:email", channelController.getChannelsFromUser);
router.get("/:channelId", channelController.getChannelById);
router.get("/", channelController.getAllChannels);

module.exports = router;
