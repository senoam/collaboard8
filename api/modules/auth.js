var express = require('express');
var jwt = require('jsonwebtoken');
const { request, response } = require('../app');
var router = express.Router();

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        res.sendStatus(401);
    }

    var verifiedUser = jwt.verify(token, process.env.ACCESS_TOKEN, (error, user) => {
        if (error) {
            return res.sendStatus(403);
        }
        req.user = user;
    });

    next();
}

function createAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '20s' });
}


module.exports = {
    verifyToken,
    createAccessToken
}