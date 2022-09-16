const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ComentarySchema = new Schema({
  nameUser: String,
  User: String,
  time: String,
  date: String,
  description: String,
  image: [
    {
      Url: String,
      PublicId: String,
    },
  ],
  megusta: [String],
  respuesta: [String],
  productIdComen: [String]
});

module.exports = mongoose.model("Comentary", ComentarySchema);
