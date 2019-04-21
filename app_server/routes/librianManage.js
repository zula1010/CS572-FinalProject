const createError = require('http-errors');
const express = require('express');
const bcrypt = require('bcrypt');
var mongoose = require('mongoose');
const Librian = require('../model/Librian');
const router = express.Router();

router.get('/', (req, res, next) => {
    // data: {
    //     items: LibrianElement[];
    //     total_count: number;
    //   }
    Librian.count({}, (err, count) => {
        if (err) {
            console.log(err);
            return next(createError(500, "DataBase error!"));
        }
        let page = req.query.page || 0;
        Librian.find({}, { password: false }).sort('-createDate').skip(page * 20)
            .limit(20)
            .exec(function (err, librianList) {
                if (err) {
                    console.log(err);
                    return next(createError(500, "DataBase error!"));
                }
                res.json({ result: true, data: { items: librianList, total_count: count } });
            });
    });

});
router.post('/', (req, res, next) => {
    var newEntity = { ...req.body };
    bcrypt.hash(newEntity.password, 2, function (err, hash) {
        newEntity.password = hash;
        newEntity.email = newEntity.email.toLowerCase().trim();
        var newLibrian = new Librian({
            _id: new mongoose.Types.ObjectId(),
            ...newEntity,
        });
        newLibrian.save(err => {
            if (!err) {
                res.json({ result: true });
            } else {
                res.json({ result: false });
            }

        });

    });

});
router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    Librian.findByIdAndUpdate(id,
        {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phoneNumber: req.body.phoneNumber,
            roles: req.body.roles
        },
        { new: true },
        (err, data) => {
            if (!err) {
                const retData = { ...data._doc };
                delete retData["password"];
                res.json({ result: true, data: retData });
            } else {
                console.log(err);
                res.json({ result: false });
            }
        });

});
module.exports = router;