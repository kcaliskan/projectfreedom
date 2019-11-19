const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const config = require("config");

const User = require("../../models/User");

passport.serializeUser(async (user, done) => {
  //User id is the id of the user's in the "user" schema in mongodb, not Google id or etc
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  let user = await User.findById(id);
  done(null, user);
});

// Google Oauth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: config.get("googleClientId"),
      clientSecret: config.get("googleClientSecret"),
      callbackURL: "/api/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        providerProfileId: profile.id
      });
      const {
        name,
        profileURL,
        given_name,
        family_name,
        picture,
        email,
        gender,
        provider
      } = profile._json;

      const username = given_name.toLowerCase() + family_name.toLowerCase();
      const providerProfileId = profile.id;

      if (existingUser) {
        done(null, existingUser);
      } else {
        const newUser = await new User({
          providerProfileId,
          name,
          username,
          pictureURL: picture,
          email,
          gender,
          profileURL,
          provider
        }).save();
        done(null, newUser);
      }
    }
  )
);

//Github

passport.use(
  new GithubStrategy(
    {
      clientID: config.get("githubClientId"),
      clientSecret: config.get("githubClientSecret"),
      callbackURL: "/api/auth/github/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);

      const existingUser = await User.findOne({
        providerProfileId: profile.id
      });

      const { displayName, username, profileUrl, provider } = profile;

      const { id, avatar_url, gender } = profile._json;

      let { email } = profile._json;

      if (email === null) {
        email = "notprovided";
      }

      const providerProfileId = id;

      if (existingUser) {
        done(null, existingUser);
      } else {
        const newUser = await new User({
          providerProfileId,
          name: displayName,
          username,
          pictureURL: avatar_url,
          email,
          gender,
          profileURL: profileUrl,
          provider
        }).save();
        done(null, newUser);
      }
    }
  )
);
