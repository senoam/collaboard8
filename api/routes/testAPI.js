var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
    res.send("API is working properly");
});

router.get("/ping", async (req, res) => {
    await req.db
        .query("SELECT 1 + 1")
        .then(() => res.send("DB works. kalm."))
        .catch(() => res.send("DB broke. PANIK."));
});

module.exports = router;
