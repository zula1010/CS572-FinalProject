const createError = require('http-errors');
const express = require('express');
const bcrypt = require('bcrypt');
var mongoose = require('mongoose');
const Reader = require('../model/Reader');
const books = require('../model/Book');
const checkoutIn = require('../model/CheckoutIn');

const router = express.Router();

router.post('/checkin', (req, res, next) => {
    // checkoutIn.count({
    //     copyId: req.body.bookId, status: 1
    // }
    checkoutIn.findOneAndUpdate({
        copyId: req.body.bookId, status: 1
    }, { status: 0 }, (err, doc) => {
        // console.log(err);
        // console.log(doc);
        // console.log(res);
        if(err)
        {
            return next(createError(500, err)); 
        }
        if(!doc)
        {
            res.json({ result: false, message: "The book copy is not borrowed by anyone." })
        } else{
            res.json({ result: true });
        }
    })

});
router.post('/checkout', (req, res, next) => {

    Reader.findById(req.body.readerId, (err, data) => {
        if (err) {
            return next(createError(500, err));
        }
        if (!data) {
            return next(createError(404, "Reader is not found"));
        }
        books.findOne({ "book_copies.copies.copy_id": req.body.bookId }).then(value => {
            if (!value) {
                return next(createError(404, "Book is not found"));
            }
            checkoutIn.count({
                copyId: req.body.bookId, status: 1
            }, (err, count) => {
                if (err) {
                    return next(createError(500, err));
                }
                if (count > 0) {
                    res.json({ result: false, message: "The book has been occupied." })
                    return;
                }
                let dt = new Date();
                dt.setDate(dt.getDate() + value.loan_duration)
                let newRecord = new checkoutIn({
                    _id: new mongoose.Types.ObjectId(),
                    copyId: req.body.bookId,
                    readerId: req.body.readerId,
                    // status: ,
                    due_date: dt
                });
                newRecord.save(err => {
                    if (err) {
                        return next(createError(500, err));
                    }
                    res.json({ result: true,  data:{due_date: dt}});
                });
            })

        }, (err) => {
            return next(createError(500, err));
        })
    });

});

module.exports = router;