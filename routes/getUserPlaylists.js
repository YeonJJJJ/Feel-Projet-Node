/*const express = require("express");
const router = express.Router();
const playlistService = require("../services/getUserPlaylists");

router.get("/:userId/:moodId", async function (req, res, next) {

  try {

    const result = await playlistService.getUserPlaylists(
      req.params.userId,
      req.params.moodId
    );

    res.json(result);

  } catch (err) {
    console.error(`Error while getting playlists`, err.message);
    next(err);
  }

});

module.exports = router;*/

const express = require("express");
const router = express.Router();
const moodService = require("../services/getUserPlaylists");

router.get("/", async function (req, res, next) {
  try {

    const result = await moodService.getPlaylists();

    res.json(result);

  } catch (err) {
    console.error(`Error while getting playlists`, err.message);
    next(err);
  }
});

module.exports = router;