const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  type: { type: String, required: true }
});

const User = mongoose.model("user", userSchema);

module.exports = User;