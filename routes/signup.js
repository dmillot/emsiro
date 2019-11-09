var express = require('express');
var mysql = require('mysql');
var passwordHash = require('password-hash');
var router = express.Router();

/* GET users page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'signup' });
});

router.post('/', function(req, res, next){

  var conn = mysql.createConnection({
    database: 'emsiro',
    host: "127.0.0.1",
    user: "root",
    password: ""
  });

  var CreateUser = 'INSERT INTO user (name, password, email) VALUES ("'+ req.body.username +'","'+ passwordHash.generate(req.body.password) +'","'+ req.body.email +'")';

  conn.query(CreateUser, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

  res.redirect('login');

});



module.exports = router;
