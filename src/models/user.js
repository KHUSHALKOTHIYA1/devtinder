const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
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
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid email address " + value);
        }
      },
    },
    password: {
      type: "string",
      require: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("put in a strong password" + value);
        }
      },
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
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "DEVT@inder$790", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordisValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );  
  return isPasswordisValid;
};

module.exports = mongoose.model("User", userSchema);
