var express = require('express');
var conn = require('../database.js');
var router = express.Router();

/* GET page. */
router.get('/', function (req, res, next) {
  res.render('connexion');
});


router.post('/', function (req, res, next) {

  var usersList = [];

  var getAllUsers = 'SELECT id, name, email FROM user';

  conn.query(getAllUsers, function (err, result) {
    if (err) throw err;
    
    if (result.length > 0) {
      for (let i = 0; i < result.length; i++) {
        var user = {};
        user['id'] = result[i].id;
        user['name'] = result[i].name;
        user['email'] = result[i].email;
        usersList.push(user);
      };
    };

    res.render('panelAdmin', { users: usersList });
    return;

  });

});

router.get('/delete/:id', function (req, res, next) {
  // console.log('id est :' + req.params.id);
  var usersList = [];

  var getAllUsers = 'SELECT id, name, email FROM user';
  var deleteUsers = 'DELETE FROM user WHERE id=' + req.params.id;


  
  conn.query(deleteUsers, function (err, result) {
    if (err) throw err;
  });

  

  conn.query(getAllUsers, function (err, result) {
    if (err) throw err;
    
    if (result.length > 0) {
      for (let i = 0; i < result.length; i++) {
        var user = {};
        user['id'] = result[i].id;
        user['name'] = result[i].name;
        user['email'] = result[i].email;
        usersList.push(user);
      };
    };

    res.render('panelAdmin', { users: usersList });
    return;
  });
});


module.exports = router;