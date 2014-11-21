var express = require('express'),
    mongoose = require('mongoose'),
    async = require('async'),
    app = require('./lib/app');

async.parallel([

    // start mongoose connection
    function(next) {
        mongoose.connect('mongodb://127.0.0.1/mypassword', function(err) {
            if (!err) {
                var db = mongoose.connection.db,
                    name = db.databaseName,
                    loc = db.serverConfig.name;

                console.log('√ mongoose connected to: ' + name + '@' + loc);
            }
            next(err);
        });
    },

    // start server
    function(next) {
        app.listen(8080, function(err) {
            if (!err) {
                console.log('√ server listening on port: ' + 8080);
            }
            next(err);
        });
    }
], function(err) {
    console.log('√ successfully running');
});
