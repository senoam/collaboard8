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

router.post("/db", function (req, res) {
    var whiteboardID = req.body.whiteboardID;
    var commentLocation = req.body.commentLocation;
    var messageText = req.body.messageText;
    var userID = req.body.userID;
    var parentCommentID = req.body.parentCommentID;
    var timestamp = req.body.timestamp;

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
        }
    );
});

module.exports = router;
