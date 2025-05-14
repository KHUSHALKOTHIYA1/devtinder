const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://khushalkothiya5:eNlKVV6JDStYMq6n@cluster0.vc2588b.mongodb.net/devTinder?retryWrites=true&w=majority"
  );
};

module.exports = connectDB;
