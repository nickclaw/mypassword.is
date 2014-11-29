var multi = require('multiparty'),
    aws = require('aws-sdk'),
    config = require('../config'),
    fs = require('fs'),
    error = require('error-factory');

var s3 = new aws.S3();

var ValidationError = error('ValidationError', {
    message: undefined,
    value: undefined
});

var StandardError = error('StandardError', {
    message: undefined,
    error: null
});

module.exports = {

    //
    // Express utils
    //

    /**
     * Returns middleware that simple renders a view
     * @param {String} view
     * @return {Function} - middleware
     */
    render: function(view) {
        return function render(req, res) {
            res.render(view);
        }
    },

    /**
     * Returns middleware that parses and saves a file to tmp
     * directory. Attaches file to req.file.file, and creates
     * cleanup function that is attached to req.file.remove.
     *
     * @param {String} name
     * @return {Function} - middleware
     */
    getFile: function(name) {
        return function getFile(req, res, next) {
            var form = new multi.Form({
                autoFiles: true
            });

            form.parse(req, function(err, fields, files) {
                if (err) return next(new StandardError('Invalid request.', err));
                if (!files[name] && !files[name].length) return next(new ValidationError('No file give.'));
                req.file = {
                    file: files[name][0],
                    remove: function(callback) {
                        fs.unlink(files[name].path, callback);
                    }
                };
                next();
            });
        }
    },

    //
    // S3 utils
    //

    uploadPicture: function(name, buffer, callback) {
        s3.putObject({
            Bucket: config.s3.bucket,
            Key: "pictures/" + name,
            ContentType: "image/jpg",
            CacheControl: "max-age=31536000",
            Body: buffer
        }, callback);
    },

    //
    // Errors
    //
    validationError: function(message, value) {
        return new ValidationError(message, value);
    },
    ValidationError: ValidationError,

    standardError: function(message, err) {
        return new StandardError(message, err);
    },
    StandardError: StandardError
}
