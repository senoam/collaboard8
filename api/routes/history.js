var express = require('express');
var router = express.Router();

router.get("/add-history", function(req, res, next) {
    var timestamp = req.body.timestamp;
    var room_id = req.body.room_id;

    var query_str = "INSERT INTO snapshots(image_time) VALUES($1) RETURNING image_id"
    req.db.query(query_str, [timestamp], function(err, result){
        if (err) {
            next(err);
            res.send("Error in snapshots table.");
        } else {
            var snap_id = result.rows[0].image_id;

            req.db.query("INSERT INTO session_history(whiteboard_id, image_id) VALUES($1, $2)", [room_id], [snap_id], function(err2, result2){
                if (err2) {
                    next(err2);
                    res.send("Error in session_history table.");
                } else {
                    data = result2["rows"];
                    console.log(data);
                    res.json({data: result.rows[0].image_id})
                }
            })
        }
    });
});

//Set up getting cross table
router.get("/get-history", function(req, res, next){
    var room_id = req.body.room_id;

    var query_str = 
    "SELECT session_history.image_id \
    FROM session_history \
    JOIN snapshots ON session_history.image_id = snapshots.image_id \
    WHERE session_history.whiteboard_id = $1 \
    ORDER BY snapshots.image_time"

    req.db.query(query_str, [room_id], function(err, result){
        if (err) {
            next(err);
            res.send("Error in getting history.");
        } else {
            res.json({data: result.rows})
        }
    });
});

module.exports = router;