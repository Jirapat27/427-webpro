const mongoose = require("mongoose");

const MouseSchema = new mongoose.Schema(
  {
    image: String,
    brand: String,
    name: String,
    sensor: String,
  },
  {
    collection: "MouseInfo",
  }
);

mongoose.model("MouseInfo", MouseSchema);