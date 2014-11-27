var router = require('express').Router(),
    Entry = require('../models/entry');

router.use(function(req, res, next) {
    next();
});

router.param('entry', function(req, res, next, id) {
    Entry.findById(id, function(err, entry) {
        if (err) return next(err);
        if (!entry) res.sendStatus(404);
        req.entry = entry;
        next();
    });
});

/**
 * Retrieve a list of entries
 * @query {Integer} limit - defaults to 10
 * @query {Integer} after - id
 * @return {Array}
 */
router.get('/',
    function(req, res, next) {
        if (req.query.after) {
            Entry.findById(req.query.after, 'added', function(err, entry) {
                if (err) return next(err);
                req.after = entry.added;
                next();
            });
        } else {
            next();
        }
    },
    function(req, res, next) {
        var query = Entry.find()
            .sort({added: 'desc'})
            .limit(req.query.limit || 10);

        if (req.after) {
            query.lt('added', req.after || Date.now())
        }

        query.exec(function(err, entry) {
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
        added: null
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
