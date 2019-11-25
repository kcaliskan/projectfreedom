const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  providerProfileId: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  pictureURL: {
    type: String
  },
  gender: {
    type: String
  },
  providerProfileURL: {
    type: String
  },
  provider: {
    type: String
  },
  codewarsUserName: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("user", UserSchema);
