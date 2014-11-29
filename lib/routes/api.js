var router = require('express').Router(),
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


var s3 = new aws.S3();

router.post('/image', function(req, res) {
    var form = new multi.Form();
    form.on('file', function(type, file) {

        var image = gm(file.path);

        async.waterfall([

            // get data
            function(callback) {
                image.identify(callback);
            },

            // validate data
            function validate(data, callback) {
                if (data.size.width < 1000 || data.size.height < 1000) {
                    return callback('Too small.');
                }

                if (data.format !== 'JPEG' && data.format !== 'PNG') {
                    return callback('Wrong type.');
                }
                callback(null, data);
            },

            // convert and save to file
            function convert(data, callback) {
                var name = Date.now() + '.jpg';
                image.quality(80)
                    .interlace('line')
                    .strip()
                    .toBuffer(function(err, buffer) {
                        s3.putObject({
                            Bucket: config.s3.bucket,
                            Key: "pictures/" + name,
                            ContentType: "image/jpg",
                            CacheControl: 'max-age=31536000',
                            Body: buffer
                        }, function(err) {
                            if (err) return callback(err);
                            callback(null, name, data);
                        });
                    });
            },

            // store path in database
            function record(path, data, callback) {
                Image.create({
                    path: path,
                    width: data.size.width,
                    height: data.size.height
                }, callback);
            }

        // send back image id
        ],function(err, entry) {
            console.log(arguments);
            if (err) return res.send(400, err);
            res.send({_id: entry._id});
        });
    });

    form.parse(req);
});

module.exports = router;
