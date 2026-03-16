const express = require("express");
const router = express.Router();
const moodService = require("../services/fillMoodTracks");

router.post("/:id", async function (req, res, next) {
  try {

    const result = await moodService.fillMoodTracks(req.params.id);

    res.json(result);

  } catch (err) {
    console.error(`Error while filling mood tracks`, err.message);
    next(err);
  }
});

module.exports = router;