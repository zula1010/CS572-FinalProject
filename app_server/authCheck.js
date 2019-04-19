const jwt = require('jsonwebtoken');
const JWT_TOKEN = require('./config/keys').jwtKey;
const authCheck = (role) => {
    return function (req, res, next) {
        let token = req.headers['authorization'];
        if (!token) {
            return next(createError(401, "Please pass in token"));
        }
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        if (token) {
            jwt.verify(token, JWT_TOKEN, (err, decoded) => {
                if (err) {
                    next(createError(401, "Token is invalid"));
                } else {
                    req.decoded = decoded;
                    if (req.decoded.roles.includes(role)) {
                        next();
                    } else {
                        next(createError(403, "You don't have permissiont to access the resoure!"));
                    }

                }
            });
        } else {
            next(createError(401, "Please pass in token"));
        }

        // var token = jwt.sign(payload, privateKEY, signOptions);
    }
}
module.exports = authCheck;
