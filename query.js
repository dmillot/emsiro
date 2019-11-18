'use strict';

var query = function querySQL(sql, conn, parameters = null) {
    return new Promise((resolve, reject) => {
        conn.query(sql, parameters, (err, results) => {
            if (err)
                return reject(err);
            resolve(results);
        });
    });
}

module.exports = query;