let express = require('express');
let router = express.Router();
let BookSchema = require('../models/books.js');

function HandleError(response, reason, message, code){
    console.log('ERROR: ' + reason);
    response.status(code || 500).json({"error": message});
}

router.post('/', (request, response, next) =>{
    let bookJSON = request.body;
    if (!bookJSON.title || !bookJSON.author)
        HandleError(response, 'Missing Information', 'Form Data Missing', 500);
    else{
        let books = new BookSchema({
            title: bookJSON.title, // firstName: request.body.firstName
            description: bookJSON.description || 'no description',
            year: bookJSON.year,
            author: bookJSON.author,
            hardcover: bookJSON.hardcover || true,
            price : bookJSON.price
        });
        books.save( (error) => {
            if (error){
                response.send({"error": error});
            }else{
                response.send({"id": books.id});
            }
        });
    }
});
// Check Post with: db.students.find()

router.get('/', (request, response, next)=>{
    let title = request.query['title'];
    if (title){
        BookSchema
            .find({"Title": title})
            .exec( (error, books) =>{
                if (error){
                    response.send({"error": error});
                }else{
                    response.send(books);
                }
            });
    }else{
        BookSchema
            .find()
            .exec( (error, books) =>{
                if (error){
                    response.send({"error": error});
                }else{
                    response.send(books);
                }
            });
    }
});

router.get('/:title', (request, response, next) =>{
    BookSchema
        .findById({"title": request.params.title}, (error, result) => {
            if (error){
                response.status(500).send(error);
            }else if (result){
                response.send(result);
            }else{
                response.status(404).send({"Title": request.params.title, "error": "Not Found"});
            }
        });
});

router.patch('/:title', (request, response, next) => {
    BookSchema
        .findById({"title": request.params.title}, (error, result) => {
            if (error) {
                response.status(500).send(error);
            }else if (result){
                if (request.body.title){
                    delete request.body.title;
                }
                for (let field in request.body){
                    result[field] = request.body[field];
                }
                result.save((error, book)=>{
                    if (error){
                        response.status(500).send(error);
                    }
                    response.send(book);
                });
            }else{
                response.status(404).send({"title": request.params.title, "error":  "Not Found"});
            }
        });
});

router.delete('/:title', (request, response, next) => {
    BookSchema
        .findById({"title": request.params.title}, (error, result)=>{
            if (error) {
                response.status(500).send(error);
            }else if (result){
                result.remove((error)=>{
                    if (error){
                        response.status(500).send(error);
                    }
                    response.send({"deletedTitle": request.params.title});
                });
            }else{
                response.status(404).send({"title": request.params.title, "error":  "Not Found"});
            }
        });
});
module.exports = router;