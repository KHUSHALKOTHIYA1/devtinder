const admin = (req, res) => {
  const token = "xyz";
  const tokencheck = token == "xyz";

  if (tokencheck) {
    res.send("user correct");
  } else {
    res.status(401).json({ message: "user not correct" });
  }
};

const user = (req, res) => {
  const token = "xyz";
  const tokencheck = token == "xyz";

  if (tokencheck) {
    res.send("user correct");
  } else {
    res.status(401).json({ message: "user not correct" });
  }
};

module.exports = { admin, user };
