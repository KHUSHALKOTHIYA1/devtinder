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

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("email id not found");
    }

    const isPasswordisValid = await bcrypt.compare(password, user.password);
    if (isPasswordisValid) {
      //create jwt token

      const token = jwt.sign({ _id: user._id }, "DEV@Tinder$790");
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

app.get("/profile", async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.find({ emailId: userEmail });
    if (user) {
      res.send(user);
    } else {
      res.status(400).send("email not find");
    }
  } catch {
    res.status(500).send("something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch {
    res.status(500).send("somthing went wrong");
  }
});

app.get("/findById/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(400).send("User ID is required");
    }
    res.send(userId);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("user deleted successfully");
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

app.patch("/user/:_id", async (req, res) => {
  const userId = req.params?._id;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      res.status(401).send("update not allowed");
    }
    if (data?.skills.length > 10) {
      return res.status(400).send("only 10 fields are allowed at this time");
    }
    await User.findByIdAndUpdate(userId, data);
    res.send("user updated successfully");
  } catch (error) {
    res.status(400).send("UPDATE FAILED" + err.message);
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
