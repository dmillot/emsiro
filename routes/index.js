var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

// const fetch = require('node-fetch');
// fetch('http://vps.cours-diiage.com:8080', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//     },
//     body: JSON.stringify({query: "{poi { total results { rdf_type }}}"})
//   })
//     .then(r => r.json())
//     .then(data=> console.log(data));