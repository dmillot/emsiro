var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('listing', { title: 'Express', elements: [{ id: 1, value: 'premier' },{ id: 2, value: 'second' }] });
});

module.exports = router;
