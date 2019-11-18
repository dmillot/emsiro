var express = require('express');
var conn = require('../../database');
var query = require('../../query');
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

	const promise = query(queryFindUser, conn, [req.body.username]);

	promise
		.then(rows => {
			if (rows.length > 0) {
				userId = rows[0].id;
				return query(queryUserExists, conn, [userId]);
			}

			throw "This user doesn't exist.";
		})
		.then(rows => {
			if (rows[0].confirmInscription)
				return query(queryCheckUserPassword, conn, [userId]);

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
			res.render('login', { message: err, type: 'danger' });
		})

});

module.exports = router;