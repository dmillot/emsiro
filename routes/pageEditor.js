var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pageEditor', { title: 'Page Editor'});
});

router.post('/', function(req, res, next) {
  //var Addcode = "ALTER TABLE `view`  (`name`, `codeHtml`, `query`, `idCategory`, `pageCategory`, `updated_at`) VALUES ( 'title' , "+req.body.mytextarea+", 'query', '0', 'Index', 'CURRENT_TIMESTAMP' );";

  res.redirect('preview',{content:req.body.mytextarea});

});

module.exports = router;
