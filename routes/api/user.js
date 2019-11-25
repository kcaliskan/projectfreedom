const express = require("express");
const router = express.Router();
const authService = require("../services/AuthService");

const User = require("../../models/User");
// @route POST api/user/profile/update
// @desc  POST new user route
// @access Public
router.put("/profile/update", authService.verifyToken, async (req, res) => {
  const { fullName, userName, email, gender, codewarsUserName } = req.body;

  try {
    if (!fullName && !userName && !email) {
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

    // let userByEmail = await User.findOne({ email });
    // let userByUsername = await User.findOne({ userName });

    // if (userByEmail) {
    //   return res.status(422).json({
    //     errors: [
    //       {
    //         reason: "email",
    //         message: "Email already exists."
    //       }
    //     ]
    //   });
    // }

    // if (userByUsername) {
    //   return res.status(422).json({
    //     errors: [
    //       {
    //         reason: "username",
    //         message: "Username already taken. Please try another one."
    //       }
    //     ]
    //   });
    // }

    //Find the signed in user's profile
    const user = await User.findById(req.user.userId).select("-password");

    //Checking that new email is already exits
    if (user.email !== email) {
      let userByEmail = await User.findOne({ email });

      if (userByEmail) {
        return res.status(422).json({
          errors: [
            {
              reason: "email",
              message: "Email already exits"
            }
          ]
        });
      } else {
      }
    }

    //Checking that new username is already exits
    if (user.userName !== userName) {
      let userByUserName = await User.findOne({ userName });

      if (userByUserName) {
        return res.status(422).json({
          errors: [
            {
              reason: "username",
              message: "Username already taken. Please try another one."
            }
          ]
        });
      }
    }

    //Update the profile
    userProfile = await User.findOneAndUpdate(
      { user: req.user.id },
      { $set: req.body },
      function(err, userProfile) {
        if (err) {
          return res.send(err);
        }
        return res.json(userProfile);
      }
    );

    // // Getting the user's avatar from gravatar by using email address
    // const pictureURL = gravatar.url(email, {
    //   s: "200",
    //   r: "pg",
    //   d: "mm"
    // });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
