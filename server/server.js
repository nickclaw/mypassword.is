var fs = require('fs'),
    mongoose = require('mongoose'),
    async = require('async'),
    app = require('./app');

module.exports = new Promise(function(res, rej) {
    async.parallel([
        // start mongo connection
        function(next) {
            mongoose.connect('mongodb://' + C.DATABASE.HOST + ':' + C.DATABASE.PORT + '/' + C.DATABASE.NAME, {
                user: C.DATABASE.USER,
                pass: C.DATABASE.PASS
            }, function(err) {
                if (err) Log.error('Could not connect to database');
                else Log.info('Connected to database');

                next(err);
            });
        },

        // start server
        function(next) {
            app.listen(C.SERVER.PORT, function(err) {
                if (err) Log.error('Could not start server');
                else Log.info('Started server');

                next(err);
            });
        }

    ], function(err) {
            if (err) {
                Log.error(err.stack);
                rej(err);
                return;
            } else {
                Log.info('App ready');
                res(app);
            }
    });
});
