const express = require("express");
const router = express.Router();
const getUsers = require("../services/getUsers");

router.get("/{:name}", async function (req, res, next) {
  try {

    console.log(req.query.name);
    res.json(await getUsers.getMultiple(req.query.page, req.query.name));
  } catch (err) {
    console.error(`Error while getting the users`, err.message);
    next(err);
  }
});

module.exports = router;
