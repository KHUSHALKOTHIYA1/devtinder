const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("../models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("user created");
  } catch (err) {
    res.status(400).send("error saving the user" + err.message);
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
    res.send("user deleted successfully")
  } catch (error) {
    res.status(500).send("Something went wrong");
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
