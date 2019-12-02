const express = require("express");
const router = express.Router();
const passport = require("passport");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

require("../services/passport");
const authService = require("../services/AuthService");

const User = require("../../models/User");

// @route GET api/auth/getUser
// @desc Get user information from db with JWT
// @access Private
router.get("/getUser", authService.verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/auth/google
// @desc Login with Google screen. OAuth Authentication, Just going to this URL will open OAuth screens
// @access Public
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

// @route GET api/auth/google/callback
// @desc  Google auth redirect handler
// @access Private
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/userexits"
  }),
  async (req, res) => {
    const authToken = await authService.signToken(req, res);
    const authURLToken = encodeURIComponent(authToken);
    res.redirect("/user/success/" + authURLToken);
  }
);

// @route GET api/auth/github/callback
// @desc   Github auth redirect handler
// @access Private
router.get(
  "/github/callback",
  passport.authenticate("github"),
  async (req, res) => {
    const authToken = await authService.signToken(req, res);
    const authURLToken = encodeURIComponent(authToken);
    res.redirect("/user/success/" + authURLToken);
  }
);

// @route POST api/auth/register
// @desc  POST new user route
// @access Public
router.post("/register", async (req, res, next) => {
  const { fullName, userName, email, password, passwordConfirm } = req.body;

  try {
    if (!fullName && !userName && !email && !password && !passwordConfirm) {
      return res.status(422).json({
        errors: [
          {
            reason: "allfields",
            message: "You must fill out all fields."
          }
        ]
      });
    }

    if (!fullName) {
      return res.status(422).json({
        errors: [
          {
            reason: "fullname",
            message: "Full Name is required"
          }
        ]
      });
    }

    if (!userName) {
      return res.status(422).json({
        errors: [
          {
            reason: "username",
            message: "Username is required"
          }
        ]
      });
    }

    if (!email) {
      return res.status(422).json({
        errors: [
          {
            reason: "email",
            message: "Email is required"
          }
        ]
      });
    }

    if (!password) {
      return res.status(422).json({
        errors: [
          {
            reason: "password",
            nessage: "Password is required"
          }
        ]
      });
    }

    if (password != passwordConfirm) {
      return res.status(422).json({
        errors: [
          {
            reason: "password",
            message: "Passwords do not match."
          }
        ]
      });
    }

    if (password.length < 6) {
      return res.status(422).json({
        errors: [
          {
            reason: "password",
            message: "Passwords must be at least 6 characters."
          }
        ]
      });
    }

    let userByEmail = await User.findOne({ email });
    let userByUsername = await User.findOne({ userName });

    if (userByEmail) {
      return res.status(422).json({
        errors: [
          {
            reason: "email",
            message: "Email already exists. Did you forget your password?"
          }
        ]
      });
    }

    if (userByUsername) {
      return res.status(422).json({
        errors: [
          {
            reason: "username",
            message: "Username already taken. Please try another one."
          }
        ]
      });
    }

    // Getting the user's avatar from gravatar by using email address
    const pictureURL = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm"
    });

    // Creating new user instance ( we did not save the user to the db yet)
    user = new User({
      providerProfileId: "",
      fullName,
      userName,
      email,
      password,
      pictureURL,
      gender: "",
      providerProfileURL: "",
      provider: "",
      codewarsUserName: ""
    });

    // Crypt the user's password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    //Saving the user to the db
    await user.save();

    const userInfo = {
      user
    };
    const token = await authService.signToken(userInfo, null);

    res.send({ token });
    return;
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/auth/login
// @desc  POST User Login and verification route
// @access Public
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email) {
      return res.status(422).json({
        errors: [
          {
            reason: "email",
            message: "Email is required"
          }
        ]
      });
    }

    if (!password) {
      return res.status(422).json({
        errors: [
          {
            reason: "password",
            message: "Password is required"
          }
        ]
      });
    }

    const userByEmail = await User.findOne({ email });

    if (userByEmail === null) {
      return res.status(422).json({
        errors: [
          {
            reason: "Email",
            message: "Email is incorrect"
          }
        ]
      });
    }

    //Checking if the password from the from and database is matching
    const isMatch = await bcrypt.compare(password, userByEmail.password);

    if (!isMatch) {
      return res.status(422).json({
        errors: [
          {
            reason: "password",
            message: "Password is incorrect"
          }
        ]
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }

  return passport.authenticate(
    "local",
    { session: false },
    async (err, passportUser, info) => {
      if (err) {
        return next(err);
      }

      if (passportUser) {
        const userInfo = {
          user: {
            _id: passportUser._id
          }
        };

        const token = await authService.signToken(userInfo, null);

        res.send({ token });
        return;
      }

      return res.status(400).info;
    }
  )(req, res, next);
});

// @route GET api/auth/logout
// @desc  GET User logout route
// @access Public
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
module.exports = router;
