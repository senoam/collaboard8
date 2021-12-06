var express = require("express");
var jwt = require("jsonwebtoken");
const { request, response } = require("../app");
var router = express.Router();

function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    console.log(token);
    if (token == null) {
        res.sendStatus(401);
        res.end();
        return;
    }

    var verifiedUser = jwt.verify(token, process.env.ACCESS_TOKEN, (error, user) => {
        if (error) {
            res.status(401).send({
                message: "forbidden"
            });
            return;
        }
        req.user = user;
        next();
    });
}

function createAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "60m" });
}

module.exports = {
    verifyToken,
    createAccessToken
};
