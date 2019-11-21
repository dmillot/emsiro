'use strict';

var query = function querySQL(query_sql, db_connection, parameters = null) {

    // create new promise that will be return
    return new Promise((resolve, reject) => {
        db_connection.query(query_sql, parameters, (err, results) => {
            if (err) {
                // if error for the query, return error
                return reject(err);
            }

            // if query succeeds, return rows
            resolve(results);
        });
    });
}

module.exports = query;