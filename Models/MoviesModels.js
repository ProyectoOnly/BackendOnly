const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title: String,
  gender: String,
  time: String,
  date: String,
  description: String,
  image: [String],

  actor: String,
  user: String,
  director: String,
  featured: String,
});
 /*  image: {
    public_id: String,
    secure_url: String,
    url: String,
  }, */
module.exports = mongoose.model("Movies", MovieSchema);
