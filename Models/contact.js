const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/profit-pulse", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let ContactModel;
try {
  ContactModel = mongoose.model("contact");
} catch (error) {
  console.log("Creating new 'contact' model");
  ContactModel = mongoose.model(
    "contact",
    new mongoose.Schema({
      name: String,
      email: String,
      subject: String,
      message: String,
    })
  );
}

module.exports = ContactModel;
