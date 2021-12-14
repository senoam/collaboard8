var express = require("express");
var router = express.Router();
var auth = require("../modules/auth");

/* GET strokes on this board. */
router.get("/get/:whiteboard_id", auth.verifyToken, function (req, res, next) {
    const whiteboardId = req.params.whiteboard_id;
    const sql_get_strokes = `SELECT * FROM strokes
      WHERE whiteboard_id = $1
      AND stroke_id NOT IN (SELECT stroke_id FROM undo_redo)
      ORDER BY draw_time ASC;`;
    req.db
        .query(sql_get_strokes, [whiteboardId])
        .then((data) => {
            res.json(data.rows);
        })
        .catch(() => res.send("Theres something wrong with strokes table."));
});

/* POST new stroke. */
router.post("/save", auth.verifyToken, function (req, res, next) {
    const { whiteboard_id, user_id, data_string, brush_shape, brush_colour, brush_size } = req.body;
    const sql = `INSERT INTO strokes(whiteboard_id, user_id, draw_time, data_string, brush_shape, brush_colour, brush_size)
    VALUES ($1, $2, current_timestamp, $3, $4, $5, $6);`;

    req.db.query(
        sql,
        [whiteboard_id, user_id, data_string, brush_shape, brush_colour, brush_size],
        function (err, result) {
            if (err) throw err;
            res.sendStatus(200);
        }
    );
});

/* POST new undo request. */
router.post("/undo", auth.verifyToken, function (req, res, next) {
    const whiteboardId = req.body.whiteboard_id;
    const userId = req.body.user_id;
    const sql_get_stroke = `SELECT data.stroke_id, data.data_string, data.brush_shape, data.brush_size
       FROM strokes data INNER JOIN (
         SELECT MAX(stroke_id) as stroke_id
         FROM strokes
         WHERE whiteboard_id=$1
         AND stroke_id NOT IN (SELECT stroke_id FROM undo_redo)
         AND user_id=$2
       ) max ON data.stroke_id = max.stroke_id
       LIMIT 1;`;
    req.db.query(sql_get_stroke, [whiteboardId, userId], function (err, result) {
        if (err) throw err;
        if (result.rows.length === 0) {
            res.sendStatus(200);
            return;
        }
        const undo_stroke = result.rows[0]["stroke_id"];
        const sql_undo = `INSERT INTO undo_redo(stroke_id) VALUES ($1)`;
        req.db.query(sql_undo, [undo_stroke], function (err, result) {
            if (err) throw err;
            res.sendStatus(200);
        });
    });
});

/* POST new redo request. */
router.post("/redo", auth.verifyToken, function (req, res, next) {
    const whiteboardId = req.body.whiteboard_id;
    const userId = req.body.user_id;
    const sql_get_stroke = `SELECT MIN(stroke_id) as stroke_id
      FROM undo_redo
      WHERE stroke_id IN (
        SELECT stroke_id
        FROM strokes
        WHERE whiteboard_id=$1
        AND user_id=$2
      )
      LIMIT 1;`;
    req.db.query(sql_get_stroke, [whiteboardId, userId], function (err, result) {
        if (err) throw err;
        if (result.rows[0]["stroke_id"] === null) {
            res.send("200", null);
            return;
        }
        const redo_stroke = result.rows[0]["stroke_id"];
        const sql_redo = `SELECT * FROM strokes WHERE stroke_id=$1`;
        req.db.query(sql_redo, [redo_stroke], function (err, result) {
            if (err) throw err;
            const sql_remove_redo = `DELETE FROM undo_redo WHERE stroke_id=$1`;
            req.db.query(sql_remove_redo, [redo_stroke], function (err, result) {
                if (err) throw err;
            });
            res.send(result.rows[0]);
        });
    });
});

/* DELETE to clean undo_redo table request. */
router.delete("/clean_undo_redo/:whiteboard_id/:user_id", auth.verifyToken, function (
    req,
    res,
    next
) {
    const whiteboardId = req.params.whiteboard_id;
    const userId = req.params.user_id;
    const sql = `DELETE FROM strokes
      WHERE whiteboard_id=$1
      AND stroke_id IN (SELECT stroke_id FROM undo_redo WHERE user_id=$2)`;
    req.db.query(sql, [whiteboardId, userId], function (err, result) {
        if (err) throw err;
        res.sendStatus(200);
    });
});

module.exports = router;
