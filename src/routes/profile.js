const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const bcrypt = require("bcrypt");

//profile api
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

//profile-view api
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

//profile-edit api
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid edit request");
    }
    const loggedInUser = req.user;
    // console.log(loggedInUser);

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();
    // console.log(loggedInUser);

    res.status(200).json({ message: "Profile updated successfully." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /profile/reset/password
profileRouter.patch("/profile/reset/password", userAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = req.user;

    const isMatch = await bcrypt.compare(currentPassword, user.newPassword);
    if (!isMatch) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and save
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

module.exports = profileRouter;
