const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
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
        given_name,
        family_name,
        picture,
        email,
        gender
      } = profile._json;

      const profileURL = profile._json.profile;
      const userName = given_name.toLowerCase() + family_name.toLowerCase();
      const { provider } = profile;
      const providerProfileId = profile.id;

      if (existingUser) {
        done(null, existingUser);
      } else {
        const newUser = await new User({
          providerProfileId,
          fullName: name,
          userName,
          pictureURL: picture,
          email,
          gender,
          providerProfileURL: profileURL,
          provider,
          password: "providerlogin"
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

      const { id, avatar_url } = profile._json;
      const gender = "notprovided";
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
          fullName: displayName,
          userName: username,
          pictureURL: avatar_url,
          email,
          gender,
          providerProfileURL: profileUrl,
          provider,
          password: "providerlogin"
        }).save();
        done(null, newUser);
      }
    }
  )
);

// Registration with email strategy / handler

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    (req, res, email, password, done) => {
      // console.log(req);
      // // Match user
      // User.findOne({
      //   email
      // }).then(user => {
      //   if (!user) {
      //     return done(null, false, { message: "That email is not registered" });
      //   }
      //   // Match password
      //   bcrypt.compare(password, user.password, (err, isMatch) => {
      //     if (err) throw err;
      //     if (isMatch) {
      //       return done(null, user);
      //     } else {
      //       return done(null, false, { message: ["Password incorrect"] });
      //     }
      //   });
      // });
      return done(null, user);
    }
  )
);
