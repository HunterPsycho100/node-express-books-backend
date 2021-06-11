const mongoose = require('mongoose');

let Schema = mongoose.Schema;
//let AuthorSchema = require('./author')

let BookSchema = new Schema({
    id: ObjectID,
    title: String,
    description: String,
    year: Number,
    hardcover: Boolean,
    author: String,
    price: Number
});

module.exports = mongoose.model('Book', BookSchema);
