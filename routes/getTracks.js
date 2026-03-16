const express = require("express");
const router = express.Router();
const moodService = require("../services/getTracks");

router.get("/", async function (req, res, next) {
  try {

    const result = await moodService.getTracks();

    res.json(result);

  } catch (err) {
    console.error(`Error while getting tracks`, err.message);
    next(err);
  }
});

module.exports = router;