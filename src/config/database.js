const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://khushalkothiya5:eNlKVV6JDStYMq6n@cluster0.vc2588b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/devTinder"
  );
};

module.exports = connectDB;
