const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  surname1: String,
  surname2: String,
  email: String,
  password: String,
  likesProduct: [String],
  images: [String],
  products: [{ type: Schema.Types.ObjectId, ref: "Movies" }],
 
});

module.exports = mongoose.model("User", UserSchema);
