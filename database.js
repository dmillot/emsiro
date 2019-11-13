'use strict';

var mysql = require('mysql');

try {

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

} catch (err) {
    console.log(err);
}


module.exports = connection;