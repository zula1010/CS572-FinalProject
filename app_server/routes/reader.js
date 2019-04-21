const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Reader = require('../model/Reader');
router.post('/add', (req, res) => {
    Reader.findOne({ 'email': req.body.email }).then(reader => {
        if (reader) {
            return res.status(400).json({ "error": "Reader exists" });
        }
        // const newReader = new Reader(req.body);
        // newReader.save();
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
router.delete('/delete/:id', (req, res) => {

    Reader.deleteOne({ '_id': req.params.id }, function (err) {
        if (err) res.status(400).json(err);
        else res.end("deleted");
    })

})
router.put('/update/:id', (req, res) => {

    Reader.findByIdAndUpdate(req.params.id, req.body)
        .then(data => res.status(200).json(data))
        .catch(err => { res.status(400).end(); console.log("aldaa") })
})
router.get('/', (req, res) => {
    Reader.find({}).sort('-createDate')
        .then(data => { res.json(data); });
})
module.exports = router;
