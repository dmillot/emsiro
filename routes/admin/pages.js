var express = require('express');
var router = express.Router();
var conn = require('../../database');
var query = require('../../query');

/* GET home page. */
router.get('/', function (req, res, next) {

    var pagesList = [];
    var queryGetAllPages = 'SELECT id, name, codeHtml FROM view';


    const promise = query(queryGetAllPages, conn);

    promise
        .then(rows => {
            if (rows.length > 0) {

                rows.forEach(page => {
                    pagesList.push({ id: page.id, name: page.name });
                });

                return res.render('pages', {
                    pages: pagesList
                });
            }

            throw "No page found.";
        })
        .catch(err => {
            console.log(err);
        })
});

router.get('/delete/:id', function (req, res, next) {
    console.log('id est :' + req.params.id);
    var pagesList = [];

    var getAllPages = 'SELECT id, name, codeHtml FROM view';
    var deletePages = 'DELETE FROM view WHERE id=' + req.params.id;

    conn.query(deletePages, function (err, result) {
        if (err) throw err;
    });

    conn.query(getAllPages, function (err, result) {
        if (err) throw err;

        if (result.length > 0) {
            for (let i = 0; i < result.length; i++) {
                var pages = {};
                pages['id'] = result[i].id;
                pages['name'] = result[i].name;
                pages['codeHtml'] = result[i].email;
                pagesList.push(pages);
            };
        };

        res.render('panelAdmin', {
            pages: pagesList
        });
        return;
    });
});

module.exports = router;