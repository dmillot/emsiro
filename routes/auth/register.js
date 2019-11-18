var express = require('express');
var conn = require('../../database');
var passwordHash = require('password-hash');
var router = express.Router();

/* GET users page. */
router.get('/', function (req, res, next) {

    if (req.session.userId != null)
        return res.redirect('/');

    res.render('signup');
});

router.post('/', function (req, res, next) {

    var queryCreateUser = 'INSERT INTO user (name, password, email) VALUES (?, ?, ?)';
    
    try {
        var parameters = [
            req.body.username,
            passwordHash.generate(req.body.password),
            req.body.email
        ];

        conn.query(queryCreateUser, parameters, function (err, result) {
            if (err) throw err;
            if (result.affectedRows == 1)
                return res.render('login', { message: "User Registration Successful! Please Login.", type: 'success' })
        });
    } catch (err) {
        return res.render('login', { message: err, type: 'danger' })
    }

});

module.exports = router;
