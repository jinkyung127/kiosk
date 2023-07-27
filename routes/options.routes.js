const express = require("express");
const router = express.Router();
const { getOptionData } = require("../routeCache");

const OptionsController = require("../controllers/options.controller");
const optionsController = new OptionsController();

router.post("/", optionsController.createOption);

router.get("/", async (req, res) => {
  try {
    const optionData = await getOptionData();
    res.json(optionData);
  } catch (error) {
    res.status(500).json({ message: "서버 에러" });
  }
});

module.exports = router;
