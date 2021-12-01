var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("Stroke API is working!");
});

router.get("/db", function (req, res) {
    req.db
        .query(`SELECT * FROM strokes;`)
        .then((data) => {
            res.json({ data: data.rows });
        })
        .catch(() => res.send("Theres something wrong with strokes table."));
});

module.exports = router;
