const express = require("express");
const router = express.Router();
const moodService = require("../services/getMoods");

router.get("/", async function (req, res, next) {
  try {

    const result = await moodService.getMoods();

    res.json(result);

  } catch (err) {
    console.error(`Error while getting moods`, err.message);
    next(err);
  }
});

module.exports = router;