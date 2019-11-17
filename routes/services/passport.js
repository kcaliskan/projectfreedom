const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const config = require("config");

const User = import("../../models/User");

// We create a new instance of Google Strategy.
passport.use(
  new GoogleStrategy(
    {
      clientID: config.get("googleClientId"),
      clientSecret: config.get("googleClientSecret"),
      callbackURL: "/api/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      new User({ googleId: profile.id }).save();
    }
  )
);
