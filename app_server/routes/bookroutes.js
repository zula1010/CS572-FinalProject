
const express = require('express');
const router = express.Router();

const uuidv4 = require('uuid/v4');
const books = require('../model/Book');

router.get('/', doGetBooks);
router.get('/book', doGetBook);
router.post('/', doCreateBook);
router.put('/', doUpdateBook);
router.delete('/book', doDeleteBook);
router.put('/copies', doAddBookCopies);
router.get('/search', doSearch);

router.put('/checkout', doCheckout);
router.put('/checkin', doCheckin);

function doGetBooks(req, res, next) {
    console.log('doGetBooks Request received: \n');
    books.find( (err, result) =>{
        if(!err) {
            console.log("Get Books successfully: ", result);
            res.json({'Success': 1, 'result': JSON.stringify(result)})
            res.end();

        }else{
            console.log("DB ERROR: ", err);
            res.json({'Success': 0, 'result': null})
            res.end();
        }
    } )
}
function doGetBook(req, res, next) {
    console.log('doGetBook Request received: \n', req.query);
    const query = {book_id: req.query['book_id']};
    books.find( query, (err, result) =>{
        if(!err) {
            console.log("Get Book successfully: ", result);
            res.json({'Success': 1, 'result': JSON.stringify(result)})
            res.end();

        }else{
            console.log("DB ERROR: ", err);
            res.json({'Success': 0, 'result': null})
            res.end();
        }
    } )
}
function doCreateBook(req, res, next){
    console.log('Request received: \n', req.body);
    const book = new books(req.body);
    book.save( (err, result) =>{
        if(!err) {
            console.log("Created Book successfully: ", result);
            res.json({'Success': 1, 'result': JSON.stringify(result)})
            res.end();

        }else{
            console.log("DB ERROR: ", err);
            res.json({'Success': 0, 'result': null})
            res.end();
        }
    } )
}

function doUpdateBook(req, res, next){
    console.log('Request received: \n', req.body);
    const update = req.body;
    const query = {book_id: update.book_id};
    console.log("book_id: ", query);
    books.findOneAndUpdate(query, update, (err, result) =>{
        if(!err) {
            console.log("Updated Book successfully: ", result);
            res.json({'Success': 1, 'result': JSON.stringify(result)})
            res.end();

        }else{
            console.log("DB ERROR: ", err);
            res.json({'Success': 0, 'result': null})
            res.end();
        }
    } )
}
function doDeleteBook(req, res, next){
    console.log('doDeleteBook Request received: \n', req.body);
    const query = req.body;
    console.log("query: ", query);
    books.findOneAndDelete(query, (err, result) =>{
        if(!err) {
            console.log("Delete Book successfully: ", result);
            res.json({'Success': 0, 'result': JSON.stringify(result)})
            res.end();

        }else{
            console.log("DB ERROR: ", err);
            res.json({'Success': 0, 'result': null})
            res.end();
        }
    } )

}


function doAddBookCopies(req, res, next){
    console.log('doAddBookCopies Request received: \n', req.body);

    let no = req.body.no;
    const copies = [];
    for(let i = 0; i < no; i++){
        const uuid = uuidv4();
        const copy = {copy_id:uuid};
        copies.push(copy);
    }
    const book_copies = [{
        note: req.body.note,
        created_date: req.body.created_date,
        copies:copies
        }]
    const query = {book_id: req.body.book_id};
    console.log('query: \n', query);

    const update = {$push : {book_copies:book_copies}};
    console.log('update: \n', update);


    books.findOneAndUpdate(query, update, (err, result) =>{
        if(!err) {
            console.log("Added book_copy successfully: ", result);
            res.json({'Success': 1, 'result': JSON.stringify(result)})
            res.end();

        }else{
            console.log("DB ERROR: ", err);
            res.json({'Success': 0, 'result': null})
            res.end();
        }
    } )

}

function doCheckout(req, res, next){
    console.log('doCheckout Request received: \n', req.body);

    const query = {book_id: req.body.book_id};
    console.log('query: \n', query);

    const update = {$push : {
                                book_checkouts:req.body.book_checkout
                            }
    };
    console.log('update: \n', update);

    books.findOneAndUpdate(query, update, (err, result) =>{
        if(!err) {
            console.log("Checkout book successfully: ", result);
            res.json({'Success': 1, 'result': JSON.stringify(result)})
            res.end();

        }else{
            console.log("DB ERROR: ", err);
            res.json({'Success': 0, 'result': null})
            res.end();
        }
    } )
}
function doCheckin(req, res, next){
    console.log('doCheckout Request received: \n', req.body);

    const query = {
        book_id: req.body.book_id,
        'book_checkouts.status': 'checkout',
        'book_checkouts.borrower_id': req.body.borrower_id
    };
    console.log('query: \n', query);


    const update = {$set :  {
                                'book_checkouts.$.status': 'checkin',
                                'book_checkouts.$.return_date': req.body.return_date,
                            }
    };
    console.log('update: \n', update);

    books.findOneAndUpdate(query, update, (err, result) =>{
        if(!err) {
            console.log("Checkout book successfully: ", result);
            res.json({'Success': 1, 'result': JSON.stringify(result)})
            res.end();

        }else{
            console.log("DB ERROR: ", err);
            res.json({'Success': 0, 'result': null})
            res.end();
        }
    } )
}
function doSearch(req, res, next){
    console.log('doSearch Request received: \n', req.query);
    const text = req.query['text'];
    const isbn = req.query['isbn'];
    let response = null;
    if(isbn !== null && isbn !== undefined && isbn !== '') {
        books.find( {isbn: isbn}, (err, result) =>{

            if(!err) {
                response = {'Success': 1, 'result': JSON.stringify(result)};
                console.log("Search Book by isbn successfully: ", response);
                res.json(response);
                res.end();
            }else{
                console.log("DB ERROR: ", err);
                res.json({'Success': 0, 'result': null})
                res.end();
            }
        } )
    }else{
        books.find( {$text: {$search: text}}, (err, result) =>{
            if(!err) {
                response = {'Success': 1, 'result': JSON.stringify(result)};
                console.log("Search Book by text successfully: ", response);
                res.json(response);
                res.end();

            }else{
                console.log("DB ERROR: ", err);
                res.json({'Success': 0, 'result': null})
                res.end();
            }
        })
    }

    let query = {isbn: 'isbn'};
    console.log('query: \n', query);




    //find by isbn first



    // books.find( {$text: {$search: text}}, (err, result) =>{
    //     if(!err) {
    //         console.log("Search Book successfully: ", result);
    //         res.json({'Success': 1, 'result': JSON.stringify(result)})
    //         res.end();
    //
    //     }else{
    //         console.log("DB ERROR: ", err);
    //         res.json({'Success': 0, 'result': null})
    //         res.end();
    //     }
    // } )
}

module.exports = router;