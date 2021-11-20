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

router.get("/collabrole", function (req, res) {
	// await req.db
	// 	.query(`SELECT * FROM whiteboard_collaborator_role;`)
	// 	.then((data) => {
	// 		res.json({ data: data.rows });
	// 	})
	// 	.catch(() => res.send("DB-whiteboard_collaborator_role broke. PANIK."));

	req.db
		.query(`SELECT * FROM whiteboard_collaborator_role;`)
		.then((data) => {
			res.json({ data: data.rows });
		})
		.catch(() =>
			res.send("Theres something wrong with whiteboard_collaborator_role.")
		);
});

module.exports = router;
