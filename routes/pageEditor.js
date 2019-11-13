var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pageEditor', { title: 'Page Editor' });
});

router.post('/', function(req, res, next) {
res.render('preview',{content:req.body.mytextarea});
});

module.exports = router;
