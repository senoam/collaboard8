var express = require('express');
var router = express.Router();
var auth = require("../modules/auth");
var bcrypt = require('bcryptjs');

// Checks if the right user is logged in
router.get('/profile', auth.verifyToken, (req, res, next) => {
    res.json(req.user)
});

// User login (takes email and password and checks if the user exists in the db)
// JWT is used for authentication and authorization
// Reference: https://www.youtube.com/watch?v=mbsmsi7l3r4
router.post('/', function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    if (email && password) {
        req.db.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
            data = results['rows'];
            if (error) {
                res.send({error: error})
            }

            // Checks if the input email exists in the db
            if (data.length > 0) {
                var valid = bcrypt.compare(password, data[0].password).then(valid => {
                    if (valid) {
                        user = {
                            email: data[0].email
                        }
                        const accessToken = auth.createAccessToken(user);
                        // res.json({accessToken: accessToken});
                        res.status(200).send({
                            email: email,
                            accessToken: accessToken
                        })
                    } else {
                        res.status(401).send("Invalid email and/or password");
                    }
                });
            } else {
                res.status(401).send("Invalid email and/or password");
            }
        });
    } else {
        res.send('Enter email and password');
    }
});

module.exports = router;