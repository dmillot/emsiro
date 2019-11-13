var express = require('express');
var router = express.Router();
var https = require('https');
var fetch = require('node-fetch');

/* GET home page. */
router.get('/', function(req, res, next) {
    req.session.userId= null;
  res.redirect('/');

});

module.exports = router;