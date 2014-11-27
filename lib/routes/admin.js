var router = require('express').Router(),
    Entry = require('../models/entry');

router.get('/', function(req, res) {
    res.render('admin.html');
});

router.get('/api/new', function(req, res) {
    Entry.findOne({'added': null}, function(err, entry) {
        if (err) return next(err);
        if (!entry) return res.sendStatus(404);
        res.send(entry);
    });
});

router.post('/api/edit/:id', function(req, res) {

});

module.exports = router;
