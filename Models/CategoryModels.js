const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoriesSchema = new Schema(
    {
    name: String,
    description: String,
    movies: { type: Schema.Types.ObjectId, ref: "Movie" },
    url: String,
    flagship: Boolean
    },
    {
        collection: 'categories'
    }
    );

module.exports = mongoose.model('Categories', CategoriesSchema);
