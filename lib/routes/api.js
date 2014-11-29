var router = require('express').Router(),
    util = require('../util.js'),
    Entry = require('../models/entry'),
    Image = require('../models/image'),
    config = require('../../config'),
    async = require('async'),
    multi = require('multiparty'),
    aws = require('aws-sdk'),
    gm = require('gm');

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
                if (!entry) return res.sendStatus(404);
                req.after = entry.added;
                next();
            });
        } else {
            next();
        }
    },
    function(req, res, next) {
        var query = Entry.find({
                added: {$ne: null}
            })
            .sort({added: 'desc'})
            .limit(req.query.limit || 10);

        if (req.after) {
            query.lt('added', req.after || Date.now());
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
router.post('/entry',
    function(req, res, next) {
        if (!req.body.image) return next();

        Image.findById(req.body.image, function(err, image) {
            if (err) return next();
            if (!image) return next();

            req.image = image.path;
            next();
        });
    }, function(req, res, next) {
        Entry.create({
            password: req.body.password,
            reason: req.body.reason,
            added: null,
            view: {
                background: req.image
            }
        }, function(err, entry) {
            if (err) return next(err);
            res.send(entry);
        });
    }
);

/**
 * Retrieve an entry by id
 * @param {Integer} entry
 * @return {Object}
 */
router.get('/:entry', function(req, res) {
    res.send(req.entry);
});

router.post('/image',
    util.getFile('file'),
    function getData(req, res, next) {
        req.file.image = gm(req.file.file.path);
        req.file.image.identify(function(err, data) {
            if (err) return next(util.standardError('Invalid image file.', err));
            req.file.data = data;
            next();
        });
    },
    function validate(req, res, next) {
        var data = req.file.data;
        if (data.format !== 'PNG' && data.format !== 'JPEG') {
            return next(util.validationError('Not a JPEG or PNG.', data.format));
        }
        if (data.size.width < 1280) {
            return next(util.validationError('Not at least 1280px wide.', data.size.width));
        }

        if (data.size.height < 720) {
            return next(util.validationError('Not at least 720px tall.', data.size.height));
        }
        next();
    },
    function convert(req, res, next) {
        var image = req.file.image;
        image.strip()
            .resize('1920', '1080')
            .interlace('Plane')
            .quality(85)
            .toBuffer(function(err, buffer) {
                if (err) return next(util.standardError('Unable to save image.', err));
                req.file.buffer = buffer;
                next();
            });
    },
    function upload(req, res, next) {
        var name = Date.now() + ".jpg";
        util.uploadPicture(name, req.file.buffer, function(err, data) {
            if (err) return next(util.standardError('Unable to save image.', err));
            req.file.s3 = data;
            req.file.name = name;
            next();
        });
    },
    function record(req, res, next) {
        Image.create({
            path: req.file.name,
            width: req.file.data.size.width,
            height: req.file.data.size.height,
            ETag: req.file.s3.ETag,
        }, function(err, image) {
            if (err) return next(util.standardError('Unable to save image.', err));
            res.send({ _id: image._id });
        });
    },
    function onError(err, req, res, next) {
        console.log('[ERROR]', err);
        res.send(400, err);
    }
);

module.exports = router;
