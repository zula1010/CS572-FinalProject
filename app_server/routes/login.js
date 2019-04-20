const createError = require('http-errors');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Librian = require('../model/Librian');
const loginRouter = express.Router();
const JWT_TOKEN = require('../config/keys').jwtKey;
loginRouter.post('/', function (req, res, next) {
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
                let token = jwt.sign({ username: user.email, roles: user.roles },
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

module.exports = loginRouter;
