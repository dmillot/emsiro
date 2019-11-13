var express = require('express');
var conn = require('../database');
var router = express.Router();

/* GET page. */
router.get('/', function (req, res, next) {
    if (req.session.userId != null) {
        var usersList = [];
        return res.render('panelAdmin', { users: usersList });
    }

    res.redirect('/admin/login');
});

router.get('/login', function (req, res, next) {
    res.render('connexion');
});

router.post('/login', function (req, res, next) {

    var usersList = [];
    var getAllUsers = 'SELECT id, name, email FROM user';

    conn.query(getAllUsers, function (err, result) {
        if (err) throw err;

        if (result.length > 0) {
            for (let i = 0; i < result.length; i++) {
                var user = {};
                user['id'] = result[i].id;
                user['name'] = result[i].name;
                user['email'] = result[i].email;
                usersList.push(user);
            };
        };

        return res.render('panelAdmin', { users: usersList });

    });

});

module.exports = router;