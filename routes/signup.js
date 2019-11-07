var express = require('express');
var router = express.Router();

/* GET users page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'signup' });
});

module.exports = router;
