var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
    res.send("History API is reachable");
});

router.post("/add-history", function (req, res, next) {
    console.log("Got add-history request");

    var { timestamp, room_id, buffer } = req.body;
    buffer = buffer.replace("data:image/png;base64,", "");

    var query_str =
        "INSERT INTO snapshots(image_time, image_data) VALUES(to_timestamp($1/1000.0), decode($2, 'base64')) RETURNING image_id";
    req.db.query(query_str, [timestamp, buffer], function (err, result) {
        if (err) {
            next(err);
            res.send("Error in snapshots table.");
        } else {
            var snap_id = result.rows[0].image_id;

            var query_str2 = "INSERT INTO session_history(room_id, image_id) VALUES($1, $2)";
            req.db.query(query_str2, [room_id, snap_id], function (err2, result2) {
                if (err2) {
                    next(err2);
                    res.send("Error in session_history table.");
                } else {
                    console.log("image id: " + result.rows[0].image_id);
                    res.json({ data: result.rows[0].image_id });
                }
            });
        }
    });
});

//Set up getting cross table
router.post("/get-history", function (req, res, next) {
    var room_id = req.body.room_id;

    var query_str =
        "SELECT snapshots.image_id, to_char(snapshots.image_time, 'DD Mon YYYY HH:MI:SSPM') AS image_time, 'data:image/png;base64,' || encode(snapshots.image_data, 'base64') AS image_data \
    FROM session_history \
    JOIN snapshots ON session_history.image_id = snapshots.image_id \
    WHERE session_history.room_id = $1 \
    ORDER BY snapshots.image_time";

    req.db.query(query_str, [room_id], function (err, result) {
        if (err) {
            next(err);
            res.send("Error in getting history.");
        } else {
            res.json({ data: result.rows });
        }
    });
});

module.exports = router;
