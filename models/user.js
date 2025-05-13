const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstname: {
    type: "string",
    require: true,
    minLength: 3,
    maxLength: 100,
  },
  lastname: {
    type: "string",
  },
  emailId: {
    type: "string",
    require: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: "string",
    require: true,
  },
  age: {
    type: "string",
    min: 18,
  },
  gender: {
    type: "string",
    validate(value) {
      if (!["male", "female", "other"].includes(value)) {
        throw new Error("gender data is not valid");
      }
    },
  },
  password: {
    type: "string",
  },
  photoUrl: {
    type: "string",
  },
  about: {
    type: String,
    default: "this is a default about a user",
  },
  skills: {
    type: [String],
  },
});

module.exports = mongoose.model("User", userSchema);
