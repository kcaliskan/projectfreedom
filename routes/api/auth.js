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
router.get(
  "/google/callback",
  passport.authenticate("google"),
  async (req, res) => {
    const authToken = await authService.signToken(req, res);
    const authURLToken = encodeURIComponent(authToken);
    console.log(authToken);
    res.redirect("/create-jwt/" + authURLToken);
    // res.json(req.user);
  }
);

// router.get("/create-jwt/:id", async (req, res) => {
//   res.redirect("/create/jwt");
// });

module.exports = router;
