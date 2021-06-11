const mongoose = require('mongoose');

// Where does this come from?
const mongoDB = process.env.MONGODB_URI || 'mongodb+srv://hwhanay:8832Soccer12!@cluster0.vmc9x.mongodb.net/books?retryWrites=true&w=majority';

// What is this syntax about?
mongoose
    .connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('DB Connected!');
    })
    .catch(error => {
        console.log('Connection Error: ${err.message}');
    });

const database = mongoose.connection;

// Bind the console to errors, to show them on console
database.on('error', console.error.bind(console, 'MongoDB Connection Error'));

module.exports = database;