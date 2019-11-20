var express = require('express');
var conn = require('../../database');
var query = require('../../query');
var passwordHash = require('password-hash');
var router = express.Router();

/* GET page. */
router.get('/', function (req, res, next) {

    // if the user is connected
    if (req.session.userId != null) {

        var usersList = [];
        var queryGetAllUsers = 'SELECT id, name, email FROM user';

        const promise = query(queryGetAllUsers, conn);

        promise
            .then(rows => {

                if (rows.length > 0) {
                    rows.forEach(user => {
                        usersList.push({ id: user.id, name: user.name, email: user.email });
                    })
                }

                return res.render('panelAdmin', { users: usersList });
            })
            .catch(err => {
                console.log(err);
                return res.render('panelAdmin', { users: usersList });
            })
    } else { // if the user isn't connected
        res.redirect('/admin/login');
    }

});

router.get('/login', function (req, res, next) {
    if (req.session.userId != null) {
        return res.redirect('/admin');
    }

    res.render('login');
});

router.post('/login', function (req, res, next) {

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
            if (passwordHash.verify(req.body.password, rows[0].password)) {
                req.session.userId = rows[0].id;
                return res.redirect('/admin');
            }

            throw "Incorrect username or password.";
        })
        .catch(err => {
            res.render('login', { message: err, type: 'danger' });
        })

});

router.get('/register', function (req, res, next) {

    if (req.session.userId != null)
        return res.redirect('/admin');

    res.render('signup');
});

router.post('/register', function (req, res, next) {

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
                return res.redirect('admin/login', { message: "User Registration Successful! Please Login.", type: 'success' })
        });
    } catch (err) {
        return res.redirect('admin/login', { message: err, type: 'danger' })
    }

});

router.get('/disconnect', function (req, res, next) {
    req.session.userId = null;
    res.redirect('/');
});

router.get('/delete/:id', function (req, res, next) {
    var usersList = [];

    var queryGetAllUsers = 'SELECT id, name, email FROM user';
    var queryDeleteUser = 'DELETE FROM user WHERE id=' + req.params.id;

    const promise = query(queryGetAllUsers, conn);

    promise
        .then(rows => {
            if (rows.length > 0) {
                rows.forEach(user => {
                    usersList.push({ id: user.id, name: user.name, email: user.email });
                })
            }

            res.render('panelAdmin', { users: usersList });
        });

    conn.query(queryDeleteUser, function (err, result) {
        if (err) throw err;
    });
});


module.exports = router;