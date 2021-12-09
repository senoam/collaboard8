var express = require("express");
var router = express.Router();

// Returns the whiteboard title and its collaborators
router.get("/id/:whiteboardId", function (req, res, next) {
    const wbQuery =
        "SELECT whiteboard_title \
        FROM whiteboard \
        WHERE whiteboard_id=$1;";

    const wbcQuery =
        "SELECT whiteboard_collaborator.user_id, whiteboard_collaborator.user_role, users.email \
        FROM whiteboard_collaborator \
        JOIN users on whiteboard_collaborator.user_id = users.user_id\
        WHERE whiteboard_id=$1;";

    const { whiteboardId } = req.params;

    req.db.query(wbcQuery, [whiteboardId], function (err, wbcResult) {
        if (err) next(err);

        req.db.query(wbQuery, [whiteboardId], function (err, wbResult) {
            if (err) next(err);

            res.json({
                ...wbResult.rows[0],
                collaborators: wbcResult.rows
            });
        });
    });
});

// Creates new whiteboard and designates creator as the owner
router.post("/create", function (req, res, next) {
    const wbQuery =
        "INSERT INTO whiteboard(whiteboard_id, whiteboard_title) \
        VALUES (DEFAULT, DEFAULT) \
        RETURNING whiteboard_id;";

    const ownerQuery =
        "INSERT INTO whiteboard_collaborator(whiteboard_id, user_id, user_role) \
        VALUES ($1, $2, 'owner') \
        RETURNING *;";

    req.db.query(wbQuery, function (err, wbResult) {
        if (err) next(err);

        const whiteboardId = wbResult.rows[0]["whiteboard_id"];

        req.db.query(ownerQuery, [whiteboardId, req.body.user_id], function (err, ownerResult) {
            if (err) next(err);

            res.json(ownerResult.rows[0]);
        });
    });
});

router.delete("/delete", function (req, res, next) {
    const wbQuery = "DELETE FROM whiteboard \
        WHERE whiteboard_id=$1 \
        RETURNING *;";

    const { whiteboard_id } = req.body;

    req.db.query(wbQuery, [whiteboard_id], function (err, wbResult) {
        if (err) next(err);

        res.json(wbResult.rows[0]);
    });
});

router.put("/edit-title", function (req, res, next) {
    const wbQuery =
        "UPDATE whiteboard \
        SET whiteboard_title=$1 \
        WHERE whiteboard_id=$2 \
        RETURNING *;";

    const { new_whiteboard_title, whiteboard_id } = req.body;

    req.db.query(wbQuery, [new_whiteboard_title, whiteboard_id], function (err, wbResult) {
        if (err) next(err);

        res.json(wbResult.rows[0]);
    });
});

router.post("/add-collaborator", function (req, res, next) {
    const wbcQuery =
        "INSERT INTO whiteboard_collaborator(whiteboard_id, user_id, user_role) \
        VALUES ($1, $2, $3) \
        RETURNING *;";

    const { whiteboard_id, user_id, user_role } = req.body;

    req.db.query(wbcQuery, [whiteboard_id, user_id, user_role], function (err, wbcResult) {
        if (err) next(err);

        res.json(wbcResult.rows[0]);
    });
});

router.delete("/remove-collaborator", function (req, res, next) {
    const wbcQuery =
        "DELETE FROM whiteboard_collaborator \
        WHERE whiteboard_id=$1 AND user_id=$2 \
        RETURNING *;";

    const { whiteboard_id, user_id } = req.body;

    req.db.query(wbcQuery, [whiteboard_id, user_id], function (err, wbcResult) {
        if (err) next(err);

        res.json(wbcResult.rows[0]);
    });
});

module.exports = router;
