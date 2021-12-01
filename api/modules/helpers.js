var express = require("express");

function insertUsertoDB(email, password, firstName, lastName, req) {
    req.db.query(
        "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)",
        [firstName, lastName, email, password],
        (err, res) => {
            if (err) {
                throw err;
            }
        }
    );
}

module.exports = {
    insertUsertoDB
};
