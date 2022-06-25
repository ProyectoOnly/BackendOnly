const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: String,
    description: String,
    description1: String,
    description2: String,
    description3: String,
    description4: String,
    image: String,
  
});

module.exports = mongoose.model('TextProductos', ProductSchema);