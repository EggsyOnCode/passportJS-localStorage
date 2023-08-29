const mongoose = require("mongoose");

require("dotenv").config();
const url = "mongodb://localhost:27017/Auth";

const connection = mongoose.connect(url, {});

// Creates simple schema for a User.  The hash and salt are derived from the user's given password when they register
const UserSchema = new mongoose.Schema({
  username: String,
  hash: String,
  salt: String,
  admin : Boolean
});

const User = mongoose.model("User", UserSchema, "users");

// Expose the connection
module.exports = User;
