const express = require("express");
const router = express.Router();
const addTrackService = require("../services/addTrack");

router.post("/", async function (req, res, next) {
  try {

    const result = await addTrackService.addTrack(req.body.trackName);

    res.json(result);

  } catch (err) {
    console.error(`Error while adding track`, err.message);
    next(err);
  }
});

module.exports = router;