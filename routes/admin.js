var express = require('express');
var router = express.Router();

/* GET page. */
router.get('/', function(req, res, next) {
  res.render('connexion');
});


router.post('/panel', function(req, res, next) {
  res.render('panelAdmin', { users: [ {"nom": "toto"} ] });
});

module.exports = router;