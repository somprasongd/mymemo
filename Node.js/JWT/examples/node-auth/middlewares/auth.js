const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = function(req, res, next) {
    const authHeader = req.header('Authorization');

    if(!authHeader) return next();

    const accessToken = authHeader.match(/Bearer (.*)/)[1];

    jwt.verify(accessToken, config.secret, (err, decoded) => {
        if(err) return next();

        req.auth = decoded;
        next();
    })
}