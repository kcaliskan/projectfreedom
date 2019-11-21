const express = require("express");
const router = express.Router();
const passport = require("passport");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const config = require("config");
require("../services/passport");
const authService = require("../services/AuthService");

const User = require("../../models/User");

// @route GET api/auth/getUser
// @desc Get user from db with JWT
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

// @route POST api/auth/register
// @desc Register user withl email
// @access Public
// router.post("/register", async (req, res, next) => {
//   const { fullName, userName, email, password, passwordConfirm } = req.body;
//   let errors = [];

//   try {
//     if (!fullName || !userName || !email || !password || !passwordConfirm) {
//       errors.push({ msg: "Please enter all fields" });
//     }

//     if (password != passwordConfirm) {
//       errors.push({ msg: "Passwords do not match" });
//     }

//     if (password.length < 6) {
//       errors.push({ msg: "Password must be at least 6 characters" });
//     }

//     if (errors.length > 0) {
//       return res.status(400).send({ errors });
//     } else {
//       //Getting the user from database by email address with mongoose
//       let user = await User.findOne({ email });

//       if (user) {
//         errors.push({ msg: "User already exist" });

//         return res.send({ success: false, errors });
//       } else {
//         // If there is a user alread exits with this email address

//         // Getting the user's avatar from gravatar by using email address
//         const pictureURL = gravatar.url(email, {
//           s: "200",
//           r: "pg",
//           d: "mm"
//         });

//         // Creating new user instance ( we did not save the user to the db yet)
//         user = new User({
//           providerProfileId: "manualregistered",
//           fullName,
//           userName,
//           email,
//           password,
//           pictureURL,
//           gender: "notprovided",
//           pictureURL: "manualregistered",
//           providerProfileURL: "manualregistered",
//           provider: "manualregistered"
//         });

//         // Crypt the user's password
//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(password, salt);

//         //Saving the user to the db
//         await user.save();

//         const req = {
//           user
//         };
//         const token = await authService.signToken(req, null);

//         res.send({ token });
//       }
//     }
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

// // Logout end point and handler
// router.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect("/");
// });

///V2

//POST new user route (optional, everyone has access)
router.post("/register", async (req, res, next) => {
  const { fullName, userName, email, password, passwordConfirm } = req.body;

  if (!fullName || !userName || !email || !password || !passwordConfirm) {
    return res.status(422).json({
      errors: [
        {
          reason: "allfields",
          message: "You must fill out all fields."
        }
      ]
    });
  }

  if (!email) {
    return res.status(422).json({
      errors: {
        reason: "email",
        message: "Email is required"
      }
    });
  }

  if (!password) {
    return res.status(422).json({
      errors: {
        reason: "password",
        nessage: "Password is required"
      }
    });
  }

  if (password != passwordConfirm) {
    return res.status(422).json({
      errors: {
        reason: "password",
        message: "Passwords do not match."
      }
    });
  }

  if (password.length < 6) {
    return res.status(422).json({
      errors: {
        reason: "password",
        message: "Passwords must be at least 6 characters."
      }
    });
  }

  let userByEmail = await User.findOne({ email });
  let userByUsername = await User.findOne({ userName });

  if (userByEmail) {
    return res.status(422).json({
      errors: {
        reason: "email",
        message: "Email already exists. Did you forget your password?"
      }
    });
  }

  if (userByUsername) {
    return res.status(422).json({
      errors: {
        reason: "username",
        message: "Username already taken. Please try another one."
      }
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
    providerProfileId: "manualregistered",
    fullName,
    userName,
    email,
    password,
    pictureURL,
    gender: "notprovided",
    pictureURL: "manualregistered",
    providerProfileURL: "manualregistered",
    provider: "manualregistered"
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
});

// Logout end point and handler
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Login Page
router.get("/login", (req, res) => res.send("yes"));

module.exports = router;
