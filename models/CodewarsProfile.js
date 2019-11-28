const mongoose = require("mongoose");

// const ProfileSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "user"
//   },
//   username: {
//     type: String
//   },
//   name: {
//     type: String
//   },
//   honor: {
//     type: String
//   },
//   clan: {
//     type: String
//   },
//   leaderboardPosition: {
//     type: String
//   },
//   skills: [],
//   ranks: {
//     overall: {
//       rank: {
//         type: String
//       },
//       name: {
//         type: String
//       },
//       color: {
//         type: String
//       },
//       score: {
//         type: String
//       }
//     },
//     languages: {}
//   },
//   codeChallanges: {
//     totalAuthored: {
//       type: String
//     },
//     totalCompleted: {
//       type: String
//     }
//   },
//   completedChallanges: {
//     totalPages: {
//       type: String
//     },
//     totalItems: {
//       type: String
//     },
//     data: []
//   },
//   date: {
//     type: Date,
//     default: Date.now
//   }
// });

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
