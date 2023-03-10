var express = require("express");
var router = express.Router();
var auth = require("../modules/auth");

//Add a timestamp and image to history db
router.post("/add-history", auth.verifyToken, function (req, res, next) {
    console.log("Got add-history request");

    var { timestamp, whiteboard_id, buffer } = req.body;
    buffer = buffer.replace("data:image/png;base64,", "");

    var query_str =
        "INSERT INTO snapshots(image_time, image_data) VALUES(to_timestamp($1/1000.0), decode($2, 'base64')) RETURNING image_id";
    req.db.query(query_str, [timestamp, buffer], function (err, result) {
        if (err) {
            next(err);
            res.send("Error in snapshots table.");
        } else {
            var snap_id = result.rows[0].image_id;

            var query_str2 = "INSERT INTO session_history(whiteboard_id, image_id) VALUES($1, $2)";
            req.db.query(query_str2, [whiteboard_id, snap_id], function (err2, result2) {
                if (err2) {
                    next(err2);
                    res.send("Error in session_history table.");
                } else {
                    res.json({ data: result.rows[0].image_id });
                }
            });
        }
    });
});

//Send all snapshots and timestamps for a given whiteboard
router.post("/get-history", auth.verifyToken, function (req, res, next) {
    var whiteboard_id = req.body.whiteboard_id;

    var query_str =
        "SELECT snapshots.image_id, to_char(snapshots.image_time, 'DD Mon YYYY HH:MI:SSPM') AS image_time, 'data:image/png;base64,' || encode(snapshots.image_data, 'base64') AS image_data \
    FROM session_history \
    JOIN snapshots ON session_history.image_id = snapshots.image_id \
    WHERE session_history.whiteboard_id = $1 \
    ORDER BY snapshots.image_time";

    req.db.query(query_str, [whiteboard_id], function (err, result) {
        if (err) {
            next(err);
            res.send("Error in getting history.");
        } else {
            res.json({ data: result.rows });
        }
    });
});

//Thumbnail get request for most recent snapshot
router.get("/thumbnail/:whiteboardId", auth.verifyToken, function (req, res, next) {
    var room_id = req.params.whiteboardId;

    var query_str =
        "SELECT 'data:image/png;base64,' || encode(snapshots.image_data, 'base64') AS image_data, snapshots.image_time \
    FROM session_history \
    JOIN snapshots ON session_history.image_id = snapshots.image_id \
    WHERE session_history.whiteboard_id = $1 \
    ORDER BY snapshots.image_time \
    DESC LIMIT 1";

    req.db.query(query_str, [room_id], function (err, result) {
        if (err) {
            next(err);
            res.send("Error in getting history.");
        } else {
            res.json(result.rows[0]);
        }
    });
});

module.exports = router;
