const mongoose = require("mongoose");

const UserDetailsScehma = new mongoose.Schema(
  {
    fname: String,
    lname: String,
    email: { type: String, unique: true },
    password: String,
    userType: { type: String, default: "user" },
  },
  {
    collection: "UserData",
  }
);

mongoose.model("UserData", UserDetailsScehma);
