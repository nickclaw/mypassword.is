var router = require('express').Router(),
    Entry = require('../models/entry');

router.use(function(req, res, next) {
    console.log(req.body);
    next();
});

router.param('entry', function(id, next) {
    Entry.findByById(id, function(err, entry) {
        if (err) return next(err);
        if (!entry) res.sendStatus(404);
        return req.entry = entry;
    });
});

/**
 * Retrieve a list of entries
 * @query {Integer} limit - defaults to 10
 * @query {Integer} offset - defaults to 0
 * @return {Array}
 */
router.get('/', function(req, res, next) {
    Entry.find()
        .sort({added: 'desc'})
        .limit(req.query.limit || 10)
        .skip(req.query.offset || 0)
        .exec(function(err, entry) {
            if (err) return next(err);
            res.send(entry);
        });
});

/**
 * Create an entry
 * @param {String} password
 * @param {String} reason
 * @return {Object}
 */
router.post('/', function(req, res, next) {
    Entry.create({
        password: req.body.password,
        reason: req.body.reason,
        added: new Date()
    }, function(err, entry) {
        if (err) return next(err);
        res.send(entry);
    });
});

/**
 * Retrieve an entry by id
 * @param {Integer} entry
 * @return {Object}
 */
router.get('/:entry', function(req, res, next) {
    res.send(req.entry);
});

module.exports = router;
