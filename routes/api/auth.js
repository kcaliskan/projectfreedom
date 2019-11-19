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

// Github OAuth Authentication
router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["profile", "email"]
  })
);

// Google auth redirect handler
router.get(
  "/google/callback",
  passport.authenticate("google"),
  async (req, res) => {
    const authToken = await authService.signToken(req, res);
    const authURLToken = encodeURIComponent(authToken);
    res.redirect("/user/success/" + authURLToken);
  }
);

// Github auth redirect handler
router.get(
  "/github/callback",
  passport.authenticate("github"),
  async (req, res) => {
    const authToken = await authService.signToken(req, res);
    const authURLToken = encodeURIComponent(authToken);
    res.redirect("/user/success/" + authURLToken);
  }
);

// Logout end point and handler
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
