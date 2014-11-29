var fs = require('fs'),
    express = require('express'),
    mongoose = require('mongoose'),
    async = require('async'),
    app = require('./lib/app'),
    config = require('./config');

var uri = 'mongodb://' + config.mongo.endpoint + ':' + config.mongo.port + '/mypassword';
async.parallel([

    // start mongoose connection
    function(next) {
        mongoose.connect(uri, function(err) {
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
    if (err) return console.log(err);
    console.log('√ successfully running');
});
