const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../services/passport");
const authService = require("../services/AuthService");

// OAuth Authentication, Just going to this URL will open OAuth screens
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

// Google auth redirect handler
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  authService.signToken(req, res);
});

router.get("/profile", authService.verifyToken, (req, res) => {
  console.log("hell yeah");
});

module.exports = router;
