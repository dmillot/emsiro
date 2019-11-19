var express = require('express');
var router = express.Router();
var conn = require('../../database');
var query = require('../../query');


function convertDate(inputFormat) {
    function pad(s) {
        return (s < 10) ? '0' + s : s;
    }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/') + " at " + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':')
}

/* GET home page. */
router.get('/', function (req, res, next) {

    var pagesList = [];
    var queryGetAllPages = 'SELECT id, name, updated_at, created_at FROM view';


    const promise = query(queryGetAllPages, conn);

    promise
        .then(rows => {
            if (rows.length > 0) {

                rows.forEach(page => {
                    pagesList.push({
                        id: page.id,
                        name: page.name,
                        updated_at: convertDate(page.updated_at),
                        created_at: convertDate(page.created_at)
                    });
                });

                return res.render('pages', {
                    pages: pagesList
                });
            }

            throw "No page found.";
           
        })
        .catch(err => {
            console.log(err);
            res.render('pages',{
                pages:pagesList
            });
        })
});

router.get('/delete/:id', function (req, res, next) {
    console.log('id est :' + req.params.id);
    var pagesList = [];

    var queryGetAllPages = 'SELECT id, name, updated_at, created_at FROM view';
    var deletePages = 'DELETE FROM view WHERE id=' + req.params.id;

    conn.query(deletePages, function (err, result) {
        if (err) throw err;
    });

    const promise = query(queryGetAllPages, conn);

    promise
        .then(rows => {
            if (rows.length > 0) {

                rows.forEach(page => {
                    pagesList.push({
                        id: page.id,
                        name: page.name,
                        updated_at: convertDate(page.updated_at),
                        created_at: convertDate(page.created_at)
                    });
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

module.exports = router;