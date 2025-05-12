const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send({ firstname: "khushal", lastname: "kothiya" });
});

app.post("/user", (req, res) => {
  res.send(rea.body);
});

app.delete("/user", (req, res) => {
  res.send("deleted successfully");
});

app.use("/test", (req, res) => {
  res.send("test is working");
});

app.listen(3000, () => {
  console.log("server is running");
});
