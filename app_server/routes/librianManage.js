const createError = require('http-errors');
const express = require('express');
const bcrypt = require('bcrypt');
var mongoose = require('mongoose');
const Librian = require('../model/Librian');
const router = express.Router();

router.post('/', (req, res, next) =>{
    var newEntity = {...req.body};


  bcrypt.hash(newEntity.password, 2, function(err, hash) {
    newEntity.password = hash;
    newEntity.email = newEntity.email.toLowerCase();
    var newLibrian = new Librian({
        _id: new mongoose.Types.ObjectId(),
        ...newEntity,
    });
    newLibrian.save(err=>{
        if(!err)
        {
            res.json({result:true});
        } else{
            res.json({result:false});
        }

    });

  });

});
module.exports = router;