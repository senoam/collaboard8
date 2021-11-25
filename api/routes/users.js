var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/db", function (req, res) {
	req.db
	.query(`SELECT * FROM user;`)
	.then((data) => {
		res.json({ data: data.rows });
	})
	.catch(() =>
		res.send("Theres something wrong with user table.")
	);
})

module.exports = router;
