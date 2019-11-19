const express = require("express");
const router = express.Router();
require("../services/passport");

router.get("/me", (req, res) => {
  res.send("Welcome");
});

module.exports = router;
