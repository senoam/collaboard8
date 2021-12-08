var express = require("express");
var router = express.Router();

/* GET check API is working. */
router.get("/", function (req, res, next) {
    res.send("Stroke API is working!");
});

/* GET stroke listing. */
router.get("/db", function (req, res) {
    req.db
        .query(`SELECT * FROM strokes;`)
        .then((data) => {
            res.json({ data: data.rows });
        })
        .catch(() => res.send("Theres something wrong with strokes table."));
});

/* GET strokes on this board. */
router.get("/get/:whiteboard_id", function (req, res, next) {
    req.db
        .query(`SELECT * FROM strokes WHERE whiteboard_id='${req.params.whiteboard_id}';`)
        .then((data) => {
            res.json(data.rows);
            console.log(data.rows);
        })
        .catch(() => res.send("Theres something wrong with strokes table."));
});

/* POST new stroke. */
router.post("/save", function (req, res, next) {
    const sql = `INSERT INTO strokes(whiteboard_id, draw_time, data_string, brush_shape, brush_colour, brush_size)
    VALUES ('${req.body.whiteboard_id}', current_timestamp, '${req.body.data_string}', '${req.body.brush_shape}', 'black', 1);`;

    req.db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
});

module.exports = router;
