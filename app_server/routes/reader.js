const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Reader = require('../model/Reader');
router.post('/add', (req, res) => {
    Reader.findOne({ 'email': req.body.email, 'removalFlag': 0 }).then(reader => {
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

    Reader.findByIdAndUpdate({ '_id': req.params.id }, { 'removalFlag': 1 }, function (err) {
        if (err) res.status(400).json(err);
        else res.json({ result: true, id: req.params.id });
    })

})
router.put('/update/:id', (req, res) => {
    Reader.findOne({ 'email': req.body.email, 'removalFlag': 0 })
        .then(reader => {
            if (reader) {
                console.log("reader exists with " + req.body.gmail + " mail from update");
                return res.status(400).json({ "error": "Reader exists" });
            }
            else {
                Reader.findByIdAndUpdate(req.params.id, req.body, { new: true })
                    .then(data => { res.status(200).json(data) })
                    .catch(err => { res.status(400).end(); console.log("aldaa") })

            }
        })
        .catch(err => res.json({ 'err': 'error' }));


})
router.get('/', (req, res) => {
    Reader.find({ 'removalFlag': 0 }).sort('-createDate')
        .then(data => { res.json(data); });
})
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Reader.findById(id).then(data => {
       
        const retData = data._doc ? { ...data._doc } : { ...data };
        if(retData["removalFlag"]===1)
        {
            return res.json({ result: false, message: "The user does not exist or is removed!" });
        } else {
            res.json({ result: true, data: retData });
        }
      

    }).catch(err => {
        res.json({ result: false });
    });

});
module.exports = router;
