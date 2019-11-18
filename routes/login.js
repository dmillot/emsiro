var express = require('express');
var conn = require('../database');
var passwordHash = require('password-hash');
var router = express.Router();

/* LOGIN FORM */
router.get('/', function (req, res, next) {

	if (req.session.userId != null) {
		return res.redirect('/');
	}

	res.render('login');
});

/* LOGIN FORM SUBMIT */
router.post('/', function (req, res, next) {

	var userId = null;
	var queryFindUser = 'SELECT id FROM user WHERE name = ? LIMIT 1';
	var queryUserExists = 'SELECT confirmInscription FROM user WHERE id = ? LIMIT 1';
	var queryCheckUserPassword = 'SELECT id, password FROM user WHERE id = ? LIMIT 1';

	function querySQL(sql, parameters = null) {
		return new Promise((resolve, reject) => {
			conn.query(sql, parameters, (err, results) => {
				if (err)
					return reject(err);
				resolve(results);
			});
		});
	}

	const promise = querySQL(queryFindUser, [req.body.username]);

	promise
		.then(rows => {
			if (rows.length > 0) {
				userId = rows[0].id;
				return querySQL(queryUserExists, [userId]);
			}

			throw "This user doesn't exist.";
		})
		.then(rows => {
			if (rows[0].confirmInscription)
				return querySQL(queryCheckUserPassword, [userId]);

			throw "Your registration has not been validated by an administrator.";
		})
		.then(rows => {
			if (passwordHash.verify(req.body.password, rows[0].password)){
				req.session.userId = rows[0].id;
				return res.redirect('/');
			}

			throw "Incorrect username or password.";
		})
		.catch(err => {
			console.log(err);
			res.render('login', { error: err });
		})

});

module.exports = router;