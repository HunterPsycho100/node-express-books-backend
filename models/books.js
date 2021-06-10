const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let AuthorSchema = require('./author')

let BookSchema = new Schema({
    id: ObjectID,
    title: String,
    description: String,
    year: Number,
    hardcover: Boolean,
    author: AuthorSchema,
    price: Number
});

module.exports = mongoose.model('Student', StudentSchema);
