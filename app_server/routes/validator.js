const createError = require('http-errors');
const express = require('express');
const Librian = require('../model/Librian');
const router = express.Router();

router.get('/checkEmailDuplicate/:email', function(req, res, next) {
    Librian.findOne({
        email:req.params.email.trim().toLowerCase()
    },(err,user)=>{
        if(user)
        {
            // If we Found someone with enail.
            res.json({ result: false });
        } else {
            res.json({ result: true });
        }
    });
});

module.exports = router;