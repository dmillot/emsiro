var express = require('express');
var router = express.Router();

/* GET users page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.get('/validate', function(req, res, next) {
  res.render('login', { title: 'Login' });
});


module.exports = router;
