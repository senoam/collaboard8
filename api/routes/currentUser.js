var express = require("express");
var router = express.Router();
var auth = require("../modules/auth");
// Gets current user
router.get("/", auth.verifyToken, (req, res, next) => {
    res.json(req.user);
});

module.exports = router;
