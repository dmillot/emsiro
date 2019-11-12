'use strict';

var mysql = require('mysql');

//db connection
var connection = mysql.createConnection({
    database: 'emsiro',
    host: "127.0.0.1",
    user: "root",
    password: ""
});

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;