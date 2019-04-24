const createError = require('http-errors');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Librian = require('../model/Librian');
const router = express.Router();
const JWT_TOKEN = require('../config/keys').jwtKey;
// References https://www.npmjs.com/package/bcrypt
// https://medium.com/@mridu.sh92/a-quick-guide-for-authentication-using-bcrypt-on-express-nodejs-1d8791bb418f

 router.post('/', function (req, res, next) {
    Librian.findOne({
        email:req.body.username
    },(err,user)=>{
        if(!user)
        {
            res.json({ result: false });
            return;
        }
        bcrypt.compare(req.body.password, user.password, (err, same) => {
            if (same) {
                let token = jwt.sign({ username: user.email, roles: user.roles, id: user._id },
                    JWT_TOKEN,
                    {
                        expiresIn: '12h'
                    }
                );
                res.json({
                    result: true,
                    message: 'Authentication successful!',
                    openId: token
                });
            } else {
                res.json({ result: false });
            }
        })
    
    })



});

module.exports = router;
