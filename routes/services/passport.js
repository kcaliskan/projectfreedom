const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const config = require("config");

const User = require("../../models/User");

passport.serializeUser((user, done) => {
  //User id is the id of the user's in the "user" schema in mongodb, not Google id or etc
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  let user = await User.findById(id);
  done(null, user);
});

// We create a new instance of Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: config.get("googleClientId"),
      clientSecret: config.get("googleClientSecret"),
      callbackURL: "/api/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        done(null, existingUser);
      } else {
        const newUser = await new User({ googleId: profile.id }).save();
        done(null, newUser);
      }
    }
  )
);
