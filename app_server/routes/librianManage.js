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
    Librian.count({ removalFlag: 0 }, (err, count) => {
        if (err) {
            console.log(err);
            return next(createError(500, "DataBase error!"));
        }
        let page = req.query.page || 0;
        Librian.find({ removalFlag: 0 }, { password: false }).sort('-modifyDate').skip(page * 10)
            .limit(10)
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
    console.log(req.body);
    var newEntity = { ...req.body };
    //roles are required
    if (!req.body.roles || req.body.roles.length <= 0) {
        res.json({ result: false });
        return;
    }
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
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Librian.findById(id).then(data => {
        const retData = data._doc ? { ...data._doc } : { ...data };
        delete retData["password"];
        res.json({ result: true, data: retData });

    }).catch(err => {
        res.json({ result: false });
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
        { new: true }).then(data => {
            const retData = data._doc ? { ...data._doc } : { ...data };
            delete retData["password"];
            res.json({ result: true, data: retData });

        }).catch(err => {
            res.json({ result: false });
        });


});
router.put('/:id/password', (req, res, next) => {
    const id = req.params.id;
    bcrypt.hash(req.body.password, 2, function (err, hash) {
        Librian.findByIdAndUpdate(id,
            {
                password: hash
            },
            { new: true }).then(data => {
                const retData = data._doc ? { ...data._doc } : { ...data };
                delete retData["password"];
                res.json({ result: true, data: retData });

            }).catch(err => {
                res.json({ result: false });
            });
    });

});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Librian.findByIdAndUpdate(id,
        {
            removalFlag:1
        },
        { new: true }).then(data => {
            const retData = data._doc ? { ...data._doc } : { ...data };
            delete retData["password"];
            res.json({ result: true, data: retData });

        }).catch(err => {
            res.json({ result: false });
        });


});

module.exports = router;