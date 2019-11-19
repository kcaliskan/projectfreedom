const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  providerProfileId: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  pictureURL: {
    type: String
  },
  gender: {
    type: String
  },
  profileURL: {
    type: String
  },
  provider: {
    type: String
  }
});

module.exports = User = mongoose.model("user", UserSchema);
