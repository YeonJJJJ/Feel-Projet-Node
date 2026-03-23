const express = require("express");
const router = express.Router();
const addUsers = require("../services/addUsers");

router.post("/", async function (req, res, next) {
  try {

    const result = await addUsers.addUser(req.body);

    res.json(result);

  } catch (err) {
    console.error(`Error while adding the user`, err.message);
    next(err);
  }
});

module.exports = router;
