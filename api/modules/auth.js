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

    var verifiedUser = jwt.verify(token, process.env.ACCESS_TOKEN, async (error, user) => {
        if (error) {
            res.status(403).send({
                message: "Unauthorized user"
            });
            return;
        }
        req.user = user;
        try {
            if (
                req.params.whiteboardId !== undefined ||
                req.params.whiteboard_id !== undefined ||
                req.body.whiteboardId !== undefined ||
                req.body.whiteboard_id !== undefined
            ) {
                const whiteboard_id =
                    req.params.whiteboardId ||
                    req.params.whiteboard_id ||
                    req.body.whiteboardId ||
                    req.body.whiteboard_id;

                // second argument should be one of the `req.` values
                var verificationCode = await verifyRole(user.email, whiteboard_id, req);
                if (verificationCode === 403) {
                    res.status(403).send({
                        message: "Unauthorized user"
                    });
                    return;
                }
            }
        } catch (e) {
            res.sendStatus(403);
            res.end();
            return;
        }
        next();
    });
}

function verifyRole(email, whiteboardID, req) {
    return new Promise((resolve, reject) => {
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
                reject("error");
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
                        reject("error");
                    }
                    if (roleQueryResult.rows.length < 1) {
                        resolve(403);
                    }

                    resolve(200);
                }
            );
        });
    });
}

function createAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "20160m" });
}

module.exports = {
    verifyToken,
    createAccessToken,
    verifyRole
};
