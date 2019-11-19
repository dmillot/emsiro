'use strict';

var query = function querySQL(query_sql, db_connection, parameters = null) {
    return new Promise((resolve, reject) => {
        db_connection.query(query_sql, parameters, (err, results) => {
            if (err)
                return reject(err);
            resolve(results);
        });
    });
}

module.exports = query;