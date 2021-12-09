var express = require("express");
var router = express.Router();

// Returns the user's whiteboard ids, titles, and their role
router.get("/id/:userId/whiteboards", function (req, res, next) {
    const query =
        "SELECT wb.whiteboard_id, wb.whiteboard_title, wbc.user_role \
        FROM whiteboard wb, whiteboard_collaborator wbc \
        WHERE \
            wb.whiteboard_id=wbc.whiteboard_id AND \
            wbc.user_id=$1;";

    const { userId } = req.params;

    req.db.query(query, [userId], function (err, dbResult) {
        if (err) next(err);

        res.json(dbResult.rows);
    });
});

module.exports = router;
