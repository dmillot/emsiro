var express = require('express');
var mysql = require('mysql');
var passwordHash = require('password-hash');
var router = express.Router();

/* GET users page. */
router.get('/', function (req, res, next) {
  res.render('login', {
    title: 'Login'
  });
});

router.post('/', function (req, res, next) {

  var conn = mysql.createConnection({
    database: 'emsiro',
    host: "127.0.0.1",
    user: "root",
    password: ""
  });

  var FindUser = 'SELECT password FROM user WHERE name = "' + req.body.username + '" LIMIT 1';

  conn.query(FindUser, function (err, result) {
    if (err) throw err;
    if (result.length > 0) {
      var passwordCorrect = passwordHash.verify(req.body.password, result[0].password);
      if (passwordCorrect) {
        res.redirect('/');
        return;
      }
    }

    res.redirect('/signup');

  });



router.post('/connected', function(req, res, next) {
  res.render('index', { title: 'Login' });
});




module.exports = router;});