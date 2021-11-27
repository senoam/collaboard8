var express = require('express');
var router = express.Router();

router.get("/db", function (req, res) {
	req.db
	.query(`SELECT * FROM comments;`)
	.then((data) => {
		res.json({ data: data.rows });
	})
	.catch(() =>
		res.send("Theres something wrong with user table.")
	);
})

module.exports = router;