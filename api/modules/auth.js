var express = require("express");
var jwt = require("jsonwebtoken");
const { request, response } = require("../app");
var router = express.Router();

function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        res.sendStatus(403);
        res.end();
        return;
    }

    var verifiedUser = jwt.verify(token, process.env.ACCESS_TOKEN, (error, user) => {
        if (error) {
            res.status(403).send({
                message: "forbidden"
            });
            return;
        }
        req.user = user;
        next();
    });
}

function verifyRoleCallback(err, result) {
    return result;
}

function verifyRole(email, whiteboardID, req, callback) {
    var roleQuery =
        "SELECT * FROM whiteboard_collaborator WHERE whiteboard_id = $1 AND user_id = $2 AND (user_role = $3 OR user_role = $4);";

    var userIdQuery = "SELECT user_id\
        FROM users \
        WHERE email=$1;";

    var userId;
    req.db.query(userIdQuery, [email], (err, userQueryResult) => {
        if (err) {
            res.send({
                message: "email not found"
            });
            callback(err, null);
        }
        userId = userQueryResult.rows[0].user_id;
        req.db.query(
            roleQuery,
            [whiteboardID, userId, "owner", "editor"],
            (error, roleQueryResult) => {
                if (error) {
                    res.send({
                        message: "Invalid wbc query"
                    });
                    callback(error, null);
                }
                if (roleQueryResult.rows.length < 1) {
                    callback(null, 403);
                }
                console.log(roleQueryResult.rows);
                callback(null, 200);
            }
        );
    });
}

function createAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "15m" });
}

module.exports = {
    verifyToken,
    createAccessToken,
    verifyRole,
    verifyRoleCallback
};
