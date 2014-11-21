var router = require('express').Router(),
    Entry = require('../models/entry');

router.use(function(req, res, next) {
    console.log(req.body);
    next();
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
        reason: req.body.reason
    }, function(err, entry) {
        if (err) return next(err);
        res.send(entry);
    });
});

module.exports = router;