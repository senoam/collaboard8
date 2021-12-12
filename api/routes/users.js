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

//Return user id given email
router.get("/id/:email", function (req, res, next) {
    const query = "SELECT user_id\
        FROM users \
        WHERE email=$1;";

    const { email } = req.params;

    req.db.query(query, [email], function (err, dbResult) {
        if (err) next(err);

        res.json(dbResult.rows[0]);
    });
});

//Return first name last name of user id for commenting
router.get("/id/:userId", function (req, res, next) {
    const query = "SELECT first_name, last_name\
        FROM users \
        WHERE user_id=$1;";

    const { userId } = req.params;

    req.db.query(query, [userId], function (err, dbResult) {
        if (err) next(err);

        res.json(dbResult.rows[0]);
    });
});

module.exports = router;
