const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title: String,
  gender: String,
  time: String,
  date: String,
  description: String,
  image: [{
    Url: String,
    PublicId: String}],
  actor: String,
  user: String,
  categoryId: String,
  director: String,
  featured: String,
  comentary: [String]
});

module.exports = mongoose.model("Movies", MovieSchema);
