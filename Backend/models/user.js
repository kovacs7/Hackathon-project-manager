const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

const userModel = mongoose.model("user" , userSchema)

module.exports = userModel