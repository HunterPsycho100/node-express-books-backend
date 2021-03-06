const mongoose = require('mongoose');

let Schema = mongoose.Schema;
//let AuthorSchema = require('./author')

let BookSchema = new Schema({
    title: String,
    description: String,
    year: Number,
    hardcover: String,
    author: String,
    price: Number
});

module.exports = mongoose.model('Book', BookSchema);
