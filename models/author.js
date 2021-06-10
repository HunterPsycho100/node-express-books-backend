const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let AuthorSchema = new Schema({
    id: ObjectID,
    name: String,
    nationality: String
});
