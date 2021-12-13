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

// GET main comments
router.get("/get/:whiteboard_id", function (req, res) {
    var whiteboardId = req.params.whiteboard_id;
    req.db.query(
        `SELECT * FROM comments WHERE whiteboard_id = $1 AND parent_comment_id = 0;`,
        [whiteboardId],
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

// GET reply comments
router.get("/get-reply/:whiteboard_id/:parent_comment_id", function (req, res) {
    var whiteboardId = req.params.whiteboard_id;
    var parentCommentId = req.params.parent_comment_id;
    req.db.query(
        `SELECT * FROM comments WHERE whiteboard_id = $1 AND parent_comment_id = $2;`,
        [whiteboardId, parentCommentId],
        (error, results) => {
            if (error) {
                // error code for undefined parent comment (occurs on initial page load)
                if (error.code === "22P02") {
                    res.status(200).send({ comments: [] });
                    return;
                }
                throw error;
            }
            res.status(200).send({
                comments: results["rows"]
            });
        }
    );
});

router.post("/db", function (req, res) {
    const { whiteboard_id, comment_location, message_text, user_id, parent_comment_id } = req.body;

    req.db.query(
        `INSERT INTO comments(whiteboard_id, comment_location, message_text, user_id, parent_comment_id, time_stamp) VALUES ($1, $2, $3, $4, $5, current_timestamp)`,
        [whiteboard_id, comment_location, message_text, user_id, parent_comment_id],
        (err, result) => {
            if (err) {
                throw err;
            }
            res.sendStatus(200);
        }
    );
});

module.exports = router;
