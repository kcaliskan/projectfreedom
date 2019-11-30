const express = require("express");
const router = express.Router();
const authService = require("../services/AuthService");
const axios = require("axios");
const cheerio = require("cheerio");
const moment = require("moment");

const User = require("../../models/User");
const CodewarsProfile = require("../../models/CodewarsProfile");

// @route POST api/user/profile/update
// @desc  POST new user route
// @access Public
router.put("/profile/update", authService.verifyToken, async (req, res) => {
  const { fullName, userName, email } = req.body;

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
      { user: req.user.userId },
      { $set: req.body },
      function(err, userProfile) {
        if (err) {
          return res.send(err);
        }
        return res.json(userProfile);
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/user/profile/codewars/update
// @desc  Get user's Codewars profile and saved to the DB
// @access Private
router.put(
  "/profile/codewars/update",
  authService.verifyToken,
  async (req, res) => {
    const codewarsUserName = req.body.codewarsUserNameInput;

    if (!codewarsUserName) {
      return res.status(422).json({
        errors: [
          {
            reason: "codewars",
            message: "Codewars Username is required"
          }
        ]
      });
    }

    try {
      let profile = await CodewarsProfile.findOne({ user: req.user.userId });

      const config = {
        headers: {
          Authorization: "exvY9BPx1KzxrnVkDP9X"
        }
      };

      const codewarsResponse = await axios.get(
        `https://www.codewars.com/api/v1/users/${codewarsUserName}`,
        config
      );

      //If there is a profile
      if (profile) {
        //If the user's completed challange number from db, equals to current codewars, we directly return its profile because there is no need to get and check the profile again
        if (
          profile.codeChallenges.totalCompleted ==
          codewarsResponse.data.codeChallenges.totalCompleted
        ) {
          getCodewarsKatasAndTags(codewarsUserName, req.user.userId);
          return res.json(profile);
        }

        //Update the profile
        profile = await CodewarsProfile.findOneAndUpdate(
          { user: req.user.userId },
          { $set: codewarsResponse.data },
          { new: true }
        );
        getCodewarsKatasAndTags(codewarsUserName, req.user.userId);

        return res.json(profile);
      }

      let profileFields = { ...codewarsResponse.data, user: req.user.userId };

      // If there is no profile, create one
      profile = new CodewarsProfile(profileFields);
      await profile.save();

      getCodewarsKatasAndTags(codewarsUserName, req.user.userId);
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send(err);
    }
  }
);

// @route GET api/user/getCurrentProfile
// @desc Get user information from db with JWT
// @access Private
router.get("/getCurrentProfile", authService.verifyToken, async (req, res) => {
  try {
    const profile = await CodewarsProfile.findOne({ user: req.user.userId });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/user/isAnalysisReady
// @desc Get the analysis status from the db
// @access Private
router.get("/isAnalysisReady", authService.verifyToken, async (req, res) => {
  try {
    const profile = await CodewarsProfile.findOne({
      user: req.user.userId
    }).select("isAnalysisReady");

    res.send(profile.isAnalysisReady);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

////*** FUNCTIONS ***/////
const getCodewarsKatasAndTags = async (username, userid) => {
  const codewarsUserName = username;
  const userId = userid;

  try {
    let profile = await CodewarsProfile.findOne({ user: userId });

    const config = {
      headers: {
        Authorization: "exvY9BPx1KzxrnVkDP9X"
      }
    };

    const codewarsResponse = await axios.get(
      `https://www.codewars.com/api/v1/users/${codewarsUserName}`,
      config
    );

    // // Get the completed challanges result for the user, it only contains first completed 200 challanges
    const completedChallangesResponse = await axios.get(
      `https://www.codewars.com/api/v1/users/${codewarsUserName}/code-challenges/completed?page=0`,
      config
    );

    // //If the user's completed challange number from db, equals to current codewars, we directly return its profile because there is no need to get and check the tags again
    if (
      profile.completedChallanges.totalItems ==
      completedChallangesResponse.data.totalItems
    ) {
      return analysisCodewarsData(userId);
    }

    const totalPages = completedChallangesResponse.data.totalPages;
    const totalCompletedChallanges = [];

    if (totalPages > 1) {
      // Iterate all pages to get all of the completed questions
      for (let i = 0; i < totalPages; i++) {
        let completedChallangesResponse = await axios.get(
          `https://www.codewars.com/api/v1/users/${codewarsUserName}/code-challenges/completed?page=${i}`,
          config
        );

        // Get the array of the completed challanges
        let totalNumberOfChallanges = completedChallangesResponse.data.data;

        // Push the completed challanges one by one to the totalCompletedChallanges array
        for (let j = 0; j < totalNumberOfChallanges.length; j++) {
          let challangeId = totalNumberOfChallanges[j].id.trim();

          // This challange id return 404 so we check it
          if (challangeId === "50654ddff44f800200000001") {
            continue;
          }

          //If there is no challangeId in the array, we jump to next completed challange
          if (challangeId === undefined || challangeId === null) {
            continue;
          }

          //We go to challange page to get the tags of it
          let challangePageHtml = await axios.get(
            `https://www.codewars.com/kata/${challangeId}`
          );

          //We create an empty array for putting all of the tags for the challange
          let tagKeywords = [];

          if (challangePageHtml.status === 200) {
            let $ = cheerio.load(challangePageHtml.data);
            $(".keyword-tag").each((i, elem) => {
              tagKeywords[i] = $(elem).text();
            });
            tagKeywords.join(", ");
          }

          if (challangePageHtml.status === 404) {
            tagKeywords = "";
            continue;
          }

          //Adding challange to the our mother array (to keep all of the challanges into one single array)
          totalCompletedChallanges.unshift(totalNumberOfChallanges[j]);

          //Adding keywords to the challange
          totalCompletedChallanges[0].tags = tagKeywords;
        }
      }
    } else {
      // Get the array of the completed challanges
      let totalNumberOfChallanges = completedChallangesResponse.data.data;

      // Push the completed challanges one by one to the totalCompletedChallanges array
      for (let j = 0; j < totalNumberOfChallanges.length; j++) {
        let challangeId = totalNumberOfChallanges[j].id.trim();

        // This challange id return 404 so we check it
        if (challangeId === "50654ddff44f800200000001") {
          continue;
        }

        //If there is no challangeId in the array, we jump to next completed challange
        if (challangeId === undefined || challangeId === null) {
          continue;
        }

        //We go to challange page to get the tags of it
        let challangePageHtml = await axios.get(
          `https://www.codewars.com/kata/${challangeId}`
        );

        //We create an empty array for putting all of the tags for the challange
        let tagKeywords = [];

        if (challangePageHtml.status === 404) {
          tagKeywords = "";
          continue;
        }

        if (challangePageHtml.status === 200) {
          let $ = cheerio.load(challangePageHtml.data);
          $(".keyword-tag").each((i, elem) => {
            tagKeywords[i] = $(elem).text();
          });
          tagKeywords.join(", ");
        }

        //Adding challange to the our mother array (to keep all of the challanges into one single array)
        totalCompletedChallanges.unshift(totalNumberOfChallanges[j]);

        //Adding keywords to the challange
        totalCompletedChallanges[0].tags = tagKeywords;
      }
    }

    // If there is a profile
    if (profile) {
      //Update the profile
      profile = await CodewarsProfile.findOneAndUpdate(
        {
          user: userId
        },
        {
          completedChallanges: {
            totalPages: completedChallangesResponse.data.totalPages,
            totalItems: completedChallangesResponse.data.totalItems,
            data: totalCompletedChallanges
          }
        },
        { new: true }
      );
      analysisCodewarsData(userId);
      return profile;
    }

    let profileFields = {
      ...codewarsResponse.data,
      user: userId,
      completedChallanges: {
        totalPages: completedChallangesResponse.data.totalPages,
        totalItems: completedChallangesResponse.data.totalItems,
        data: totalCompletedChallanges
      }
    };

    // If there is no profile, create one
    profile = new CodewarsProfile(profileFields);
    await profile.save();

    analysisCodewarsData(userId);

    return profile;
  } catch (err) {
    console.error(err.message);
    return err.message;
  }
};

const analysisCodewarsData = async userId => {
  const user_id = userId;

  try {
    //Get the user profile
    let profile = await CodewarsProfile.findOne({ user: user_id });

    //Get the all completed challanges
    const completedChallanges = profile.completedChallanges.data;
    let sortByYearAndMonth = {};
    let sortByDay = {};

    //Loop through the completed challanges array to sort them by year, month
    for (let i = 0; i < completedChallanges.length; i++) {
      const completedChallangeId = completedChallanges[i].id;
      const completedChallangeName = completedChallanges[i].name;
      const completedChllangeTags = completedChallanges[i].tags;
      const completedDate = completedChallanges[i].completedAt;

      const completedDateFormatted = moment(completedDate).format("YYYY-MM-DD");

      const solvedYear = moment(completedDateFormatted, "YYYY-MM-DD").year();
      // const solvedMonth = 1 + moment(completedDate, "YYYY-MM-DD").month();
      const solvedMonth = moment(completedDateFormatted).format("MMMM");

      const solvedDay = moment(completedDate).format("dddd");

      console.log(solvedDay);
      if (!sortByYearAndMonth[`${solvedYear}`]) {
        sortByYearAndMonth[`${solvedYear}`] = {};
      }

      if (!sortByYearAndMonth[`${solvedYear}`][`${solvedMonth}`]) {
        sortByYearAndMonth[`${solvedYear}`][`${solvedMonth}`] = [];
      }

      if (sortByYearAndMonth[`${solvedYear}`][`${solvedMonth}`]) {
        sortByYearAndMonth[`${solvedYear}`][`${solvedMonth}`].push({
          name: completedChallangeName,
          challangeId: completedChallangeId,
          tags: completedChllangeTags
        });
      }

      if (!sortByDay["solvedDay"]) {
        sortByDay["solvedDay"] = {};
      }

      if (!sortByDay["solvedDay"][`${solvedDay}`]) {
        sortByDay["solvedDay"][`${solvedDay}`] = 0;
        sortByDay["solvedDay"][`${solvedDay}`]++;
      } else {
        sortByDay["solvedDay"][`${solvedDay}`]++;
      }
    }

    //Get completed years from the sortByYearAndMonth object
    let years = [];
    for (let key in sortByYearAndMonth) {
      if (sortByYearAndMonth.hasOwnProperty(key)) years.push(key);
    }

    //Get months of the each year from the sortByYearAndMonth object
    let months = [];
    for (let i = 0; i < years.length; i++) {
      for (let key in sortByYearAndMonth[years[i]]) {
        if (sortByYearAndMonth[years[i]].hasOwnProperty(key)) months.push(key);
      }
    }

    //Figure out that how many challages completed each year
    let numbers = {};

    for (let z = 0; z < years.length; z++) {
      for (let j = 0; j <= months.length; j++) {
        let year = years[z];

        if (sortByYearAndMonth[years[z]].hasOwnProperty(months[j])) {
          if (!numbers[year]) {
            numbers[year] = sortByYearAndMonth[years[z]][months[j]].length;
          } else {
            numbers[year] += sortByYearAndMonth[years[z]][months[j]].length;
          }
        }
      }
    }

    console.log(sortByDay);
    profile = await CodewarsProfile.findOneAndUpdate(
      {
        user: userId
      },
      {
        completedByYearAndMonth: sortByYearAndMonth,
        completedByDay: sortByDay,
        isAnalysisReady: true
      },
      { new: true }
    );

    return profile;
  } catch (err) {
    console.log(err);
  }
};
module.exports = router;
