const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Reader = require('../model/Reader');


router.post('/add', (req, res) => {
    Reader.findOne({ 'email': req.body.email }).then(reader => {
        if (reader) {
            return res.status(400).json({ "error": "Reader exists" });
        }
        const newReader = new Reader({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            address: {
                state: req.body.state,
                city: req.body.city,
                zip: req.body.zip,
                street: req.body.street
            }
        });
        newReader.save().then(reader => res.status(200).json(reader)).catch(err => console.log(err));
    })
        .catch(err => {
            return res.status(400).json({ 'aaa': 'aa' })
        });

});
module.exports = router;
