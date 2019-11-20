'use strict';

var mysql = require('mysql');

try {

    //database connection
    var connection = mysql.createConnection({
        database: 'web1',
        host: "nico.cours-diiage.com",
        user: "web1",
        password: "D2019"
    });

} catch (err) {
    console.log("Database error. error: " + err);
}


module.exports = connection;