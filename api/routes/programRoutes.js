const express = require("express");
const router = express.Router();

const programController = require("../controllers/programController");

router.get("/favorites/:email", programController.getProgramsFromUser);
router.get("/categories/:channelId", programController.renderCategories);
router.get(
  "/:channelId/:categoryId/",
  programController.renderProgramsByCategory
);
router.get("/:channelId", programController.renderProgramsById);
//router.get("/:programId", programController.getSpecificProgram);
router.get("/", programController.getAllPrograms);

module.exports = router;
