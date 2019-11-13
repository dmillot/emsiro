var express = require('express');
var conn = require('../database.js');
var passwordHash = require('password-hash');
var router = express.Router();

/* GET users page. */
router.get('/', function (req, res, next) {
  console.log(req.session.userId);
  if(req.session.userId != null)
  {
    res.redirect('/');
    return;
  }


  res.render('login', {
    title: 'Login'
  });
});

router.post('/', function (req, res, next) {

  var FindUser = 'SELECT id, password FROM user WHERE name = "' + req.body.username + '" LIMIT 1';

  conn.query(FindUser, function (err, result) {
    if (err) throw err;
    if (result.length > 0) {
      var passwordCorrect = passwordHash.verify(req.body.password, result[0].password);
      if (passwordCorrect) {
        req.session.userId = result[0].id;
        res.redirect('/');
        return;
      }
    }

    res.redirect('/signup');

  });



  router.post('/connected', function (req, res, next) {
    res.render('index', { title: 'Login' });
  });


});

module.exports = router;