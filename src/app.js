const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("../src/models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

//signup api
app.post("/signup", async (req, res) => {
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
app.post("/login", async (req, res) => {
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

//profile api
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//send connection api
app.get("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("database connected");
    app.listen(7777, () => {
      console.log("server connected");
    });
  })
  .catch((err) => {
    console.error("database not connected");
  });
