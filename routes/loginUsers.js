const express = require("express");
const router = express.Router();
const loginService = require("../services/loginUsers");

router.post("/", async function (req, res, next) {
  try {

    const result = await loginService.login(req.body);

    res.json(result);

  } catch (err) {
    console.error(`Error while logging in`, err.message);
    next(err);
  }
});

module.exports = router;