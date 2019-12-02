const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  username: {
    type: String
  },
  name: {
    type: String
  },
  honor: {
    type: String
  },
  clan: {
    type: String
  },
  leaderboardPosition: {
    type: String
  },
  skills: [],
  ranks: {},
  codeChallenges: {},
  completedChallanges: {
    totalPages: {
      type: String
    },
    totalItems: {
      type: String
    },
    data: []
  },
  completedByYearAndMonth: {},
  completedByDay: {},
  isAnalysisReady: {
    type: Boolean,
    default: false
  },
  completedByYear: {},
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = CodewarsProfile = mongoose.model(
  "codewarsprofile",
  ProfileSchema
);
