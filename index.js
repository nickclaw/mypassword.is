var fs = require('fs'),
    express = require('express'),
    mongoose = require('mongoose'),
    async = require('async'),
    app = require('./lib/app'),
    config = require('./config');

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
        app.listen(config.port, function(err) {
            if (!err) {
                console.log('√ server listening on port: ' + config.port);
            }
            next(err);
        });
    }
], function(err) {
    console.log('√ successfully running');
});
