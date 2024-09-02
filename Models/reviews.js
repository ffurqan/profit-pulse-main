const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/profit-pulse", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let reviewsModel;
try {
  reviewsModel = mongoose.model("reviews");
} catch (error) {
  console.log("Creating new 'reviews' model");
  reviewsModel = mongoose.model(
    "reviews",
    new mongoose.Schema({
      name: String,
      message: String,
    })
  );
}

module.exports = reviewsModel;
