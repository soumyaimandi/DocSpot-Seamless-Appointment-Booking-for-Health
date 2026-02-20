const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/bookdoctor");
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("MongoDB Error");
    console.log(error);
  }
};

module.exports = connectToDB;
