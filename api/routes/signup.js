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
        .query('SELECT * FROM users WHERE email = $1', [email],  (error, results) => {
            data = results['rows'];
            if (error) {
                throw error;
            } else if (data.length !== 0) {
                res.send('account with that email already exists');
                res.end();
            } else {
                insertUsertoDB(email, password, firstName, lastName, req);
                res.send('user added');
            }
        });
    } else {
        res.send("Please insert your information");
    }
});

function insertUsertoDB(email, password, firstName, lastName, req) {
    req.db
    .query('INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)', 
        [email, password, firstName, lastName],  (err, res) => {
        if (err) {
            throw err;
        }
    });
}

module.exports = router;