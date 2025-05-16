const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

//signup api
authRouter.post("/signup", async (req, res) => {
  try {
    //sign up validation
    validateSignUpData(req);

    const { firstname, lastname, emailId, password } = req.body;

    //hash the password
    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);

    const user = new User({
      firstname,
      lastname,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("user created");
  } catch (err) {
    res.status(500).send("error saving the user" + err.message);
  }
});

// login api
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("email id not found");
    }

    const isPasswordisValid = await user.validatePassword(password);
    if (isPasswordisValid) {
      //create jwt token

      const token = await user.getJWT();
      // console.log(token);

      //add token to cookie and send  the response back to user
      res.cookie("token", token);
      res.send("login successfull");
    } else {
      throw new Error("password is incorrect");
    }
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

//logout api
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("logout successfull");
});

module.exports = authRouter;
