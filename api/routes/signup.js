var express = require('express');
const { request, response } = require('../app');
var router = express.Router();
var helpers = require('../modules/helpers');
var bcrypt = require('bcryptjs');

router.get('/', function (req, res, next) {
    res.send('Sign up Page');
});

router.post('/', function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;

    if(email && password && firstName && lastName) {
        req.db
        .query('SELECT * FROM users WHERE email = $1', [email],  (error, results) => {
            data = results['rows'];
            console.log(data);
            if (error) {
                throw error;
            } else if (data.length !== 0) {
                res.send('account with that email already exists');
                res.end();
            } else {
                saltRounds = 10;
                bcrypt.hash(password, saltRounds, function (err, hash) {
                    if (err) {
                        throw err;
                    }
                    helpers.insertUsertoDB(email, hash, firstName, lastName, req);
                    res.send('user added successfully');
                });
            }
        });
    } else {
        res.send("Please insert your information");
    }
});



module.exports = router;