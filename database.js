'use strict';

var mysql = require('mysql');

try {

    //db connection
    var connection = mysql.createConnection({
        database: 'web1',
        host: "nico.cours-diiage.com",
        user: "web1",
        password: "D2019"
    });

} catch (err) {
    console.log(err);
}


module.exports = connection;