var express = require('express');
var conn = require('../database.js');
var passwordHash = require('password-hash');
var router = express.Router();

/* GET users page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'signup' });
});

router.post('/', function(req, res, next){

  var CreateUser = 'INSERT INTO user (name, password, email) VALUES ("'+ req.body.username +'","'+ passwordHash.generate(req.body.password) +'","'+ req.body.email +'")';

  conn.query(CreateUser, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

  res.redirect('login');

});



module.exports = router;
