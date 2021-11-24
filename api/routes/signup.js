var express = require('express');
const { request, response } = require('../app');
var router = express.Router();

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
        .query('SELECT * FROM users WHERE email = ?', [email], function (error, results) {
            if (error) {
                throw error;
            } else if (results.length > 0) {
                response.send('account with that email already exists');
            } else {

            }
        })
    }

});

function insertUsertoDB(username, password, firstName, lastName) {
    req.db
    .query('INSERT INTO users (')
}

module.exports = router;