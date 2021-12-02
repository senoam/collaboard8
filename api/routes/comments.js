var express = require("express");
var router = express.Router();

router.get("/db", function (req, res) {
    req.db
        .query(`SELECT * FROM comments;`)
        .then((data) => {
            res.json({ data: data.rows });
        })
        .catch(() => res.send("Theres something wrong with user table."));
});

router.post("/get-comments", function (req, res) {
    var whiteboardID = req.body.whiteboard_id;
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

router.post("/db", function (req, res) {
    var whiteboardID = req.body.whiteboard_id;
    var commentLocation = req.body.comment_location;
    var messageText = req.body.message_text;
    var userID = req.body.user_id;
    var parentCommentID = req.body.parent_comment_id;
    var timestamp = req.body.time_stamp;

    console.log("OOOOOOOOOO");
    req.db.query(
        `INSERT INTO comments(whiteboard_id, comment_location, message_text, user_id, parent_comment_id, time_stamp) VALUES ($1, $2, $3, $4, $5, $6)`,
        [
            whiteboardID,
            commentLocation,
            messageText,
            userID,
            parentCommentID,
            timestamp
        ],
        (err, result) => {
            if (err) {
                throw err;
            }
            res.status(200).send("Comment added successfully");
        }
    );
});

module.exports = router;
