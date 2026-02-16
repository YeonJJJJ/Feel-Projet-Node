const express = require("express");
const router = express.Router();
const getUsers = require("../services/getUsers");

router.get("/", async function (req, res, next) {
  try {
    res.json(await getUsers.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting the users`, err.message);
    next(err);
  }
});

module.exports = router;
