var router = require('express').Router(),
    Entry = require('../models/entry');

router.get('/', function(req, res) {
    res.render('admin.html');
});

router.get('/api/entry', function(req, res) {
    Entry.findOne({'added': null}, function(err, entry) {
        if (err) return next(err);
        if (!entry) return res.sendStatus(404);
        res.send(entry);
    });
});

router.post('/api/entry/:id', function(req, res) {
    if (!req.body || !req.body.view) {
        res.sendStatus(400);
        return;
    }

    Entry.findOneAndUpdate({
        _id: req.params.id
    }, req.body, function(err, entry) {
        if (err) return next(err);
        res.sendStatus(200);
    });
});

router.delete('/api/entry/:id', function(req, res) {
    Entry.findByIdAndRemove(req.params.id, function(err) {
        if (err) return next(err);
        res.sendStatus(200);
    });
});

module.exports = router;
