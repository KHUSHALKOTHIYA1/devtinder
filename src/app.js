const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.send("test is working");
});

app.use("/hello", (req, res) => {
  res.send("hello world");
});

app.listen(3000, () => {
  console.log("server is running");
});
