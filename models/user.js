const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstname: {
    type: "string",
  },
  lastname: {
    type: "string",
  },
  emailId: {
    type: "string",
  },
  password: {
    type: "string",
  },
  age: {
    type: "string",
  },
  password: {
    type: "string",
  },
});

module.exports = mongoose.model("User", userSchema);
