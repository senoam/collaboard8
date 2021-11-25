var express = require('express');
var router = express.Router();
var auth = require("../modules/auth");
var bcrypt = require('bcrypt');

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
        req.db.query('SELECT * FROM user WHERE email = $1', [email], (error, results) => {
            data = results['rows'];
            if (error) {
                throw error;
            } 
            var valid = bcrypt.compare(password, data[0].password).then(valid => {
                if (valid) {
                    user = {
                        email: data[0].email
                    }
                    const accessToken = auth.createAccessToken(user);
                    res.json({accessToken: accessToken});
                } else {
                    res.send("Invalid email and/or password")
                }
                res.end();
            })
        });
    } else {
        res.send('Enter email and password');
        res.end();
    }
});

module.exports = router;