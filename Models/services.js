const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/profit-pulse", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let ServicesModel;
try {
  ServicesModel = mongoose.model("services");
} catch (error) {
  console.log("Creating new 'services' model");
  ServicesModel = mongoose.model(
    "services",
    new mongoose.Schema({
      name: String,
      desc: String,
    })
  );
}

module.exports = ServicesModel;
