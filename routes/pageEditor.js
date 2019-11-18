var express = require('express');
var router = express.Router();
var conn = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pageEditor', { title: 'Page Editor'});
});

router.post('/', function(req, res, next) {
  var Addcode = "ALTER TABLE `view`   VALUES ( 'title' , "+req.body.mytextarea+", 'query', '0', 'Index', 'CURRENT_TIMESTAMP' );";

conn.query("INSERT INTO view (`name`, `codeHtml`, `updated_at`) VALUES (?,?,CURRENT_TIMESTAMP)",[req.body.NamePage,req.body.mytextarea],function (err,result) {
  if(err) throw err;  
  // console.log(result);
  res.render('preview',{content:req.body.mytextarea});
});
});

module.exports = router;
