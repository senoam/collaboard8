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
    const sql_get_strokes = `SELECT * FROM strokes
      WHERE whiteboard_id='${req.params.whiteboard_id}'
      AND stroke_id NOT IN (SELECT stroke_id FROM undo_redo);`;
    req.db
        .query(sql_get_strokes)
        .then((data) => {
            res.json(data.rows);
        })
        .catch(() => res.send("Theres something wrong with strokes table."));
});

/* POST new stroke. */
router.post("/save", function (req, res, next) {
    const { whiteboard_id, data_string, brush_shape, brush_colour, brush_size } = req.body;
    const sql = `INSERT INTO strokes(whiteboard_id, draw_time, data_string, brush_shape, brush_colour, brush_size)
    VALUES ('${whiteboard_id}', current_timestamp, '${data_string}', '${brush_shape}', '${brush_colour}', '${brush_size}');`;

    req.db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
});

/* POST new undo request. */
router.post("/undo", function (req, res, next) {
    // TODO: add user check
    const sql_get_stroke = `SELECT data.stroke_id, data.data_string, data.brush_shape, data.brush_size
       FROM strokes data INNER JOIN (
         SELECT MAX(stroke_id) as stroke_id
         FROM strokes
         WHERE whiteboard_id='${req.body.whiteboard_id}'
         AND stroke_id NOT IN (SELECT stroke_id FROM undo_redo)
       ) max ON data.stroke_id = max.stroke_id
       LIMIT 1;`;
    req.db.query(sql_get_stroke, function (err, result) {
        if (err) throw err;
        if (result.rows.length === 0) {
            res.sendStatus(200);
            return;
        }
        const undo_stroke = result.rows[0]["stroke_id"];
        const sql_undo = `INSERT INTO undo_redo(stroke_id) VALUES ('${undo_stroke}')`;
        req.db.query(sql_undo, function (err, result) {
            if (err) throw err;
            res.sendStatus(200);
        });
    });
});

/* POST new redo request. */
router.post("/redo", function (req, res, next) {
    // TODO: add user check
    const sql_get_stroke = `SELECT MIN(stroke_id) as stroke_id
      FROM undo_redo
      WHERE stroke_id IN (
        SELECT stroke_id
        FROM strokes
        WHERE whiteboard_id='${req.body.whiteboard_id}'
      )
      LIMIT 1;`;
    req.db.query(sql_get_stroke, function (err, result) {
        if (err) throw err;
        if (result.rows[0]["stroke_id"] === null) {
            res.send("200", null);
            return;
        }
        const redo_stroke = result.rows[0]["stroke_id"];
        const sql_redo = `SELECT * FROM strokes WHERE stroke_id='${redo_stroke}'`;
        req.db.query(sql_redo, function (err, result) {
            if (err) throw err;
            const sql_remove_redo = `DELETE FROM undo_redo WHERE stroke_id='${redo_stroke}'`;
            req.db.query(sql_remove_redo, function (err, result) {
                if (err) throw err;
            });
            res.send(result.rows[0]);
        });
    });
});

/* DELETE to clean undo_redo table request. */
router.delete("/clean_undo_redo/:whiteboard_id", function (req, res, next) {
    // TODO: add user check
    const sql = `DELETE FROM strokes
      WHERE whiteboard_id='${req.params.whiteboard_id}'
      AND stroke_id IN (SELECT stroke_id FROM undo_redo)`;
    req.db.query(sql, function (err, result) {
        if (err) throw err;
    });
});

module.exports = router;
