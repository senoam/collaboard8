var express = require("express");
var router = express.Router();
var auth = require("../modules/auth");

router.get("/db", auth.verifyToken, function (req, res) {
    req.db
        .query(`SELECT * FROM comments;`)
        .then((data) => {
            res.json({ data: data.rows });
        })
        .catch(() => res.send("Theres something wrong with user table."));
});

router.get("/get/:whiteboard_id", function (req, res) {
    var whiteboardID = req.params.whiteboard_id;
    req.db.query(
        `SELECT * FROM comments WHERE whiteboard_id = $1`,
        [whiteboardID],
        (error, results) => {
            if (error) {
                throw error;
            }

            res.status(200).send({
                comments: results["rows"]
            });
        }
    );
});

router.post("/get-comments", [auth.verifyToken], function (req, res) {
    var whiteboardID = req.body.whiteboard_id;
    req.db.query(
        `SELECT * FROM comments WHERE whiteboard_id = $1`,
        [whiteboardID],
        (error, results) => {
            if (error) {
                res.status(404).send({
                    message: "whiteboard id not found"
                });
                return;
            }

            res.status(200).send({
                comments: results["rows"]
            });
        }
    );
});

router.post("/db", auth.verifyToken, function (req, res) {
    const { whiteboard_id, comment_location, message_text, user_id, parent_comment_id } = req.body;

    req.db.query(
        `INSERT INTO comments(whiteboard_id, comment_location, message_text, user_id, parent_comment_id, time_stamp) VALUES ($1, $2, $3, $4, $5, current_timestamp)`,
        [whiteboard_id, comment_location, message_text, user_id, parent_comment_id],
        (err, result) => {
            if (err) {
                res.status(404).send({
                    message: "Whiteboard id is not found"
                });
                return;
            }
            res.status(200).send("Comment added successfully");
        }
    );
});

module.exports = router;
