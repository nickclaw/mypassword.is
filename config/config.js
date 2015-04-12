var nconf = require('nconf'),
    path = require('path'),
    Promise = require('bluebird'),
    winston = require('winston');

require('babel/register')({
    extensions: ['.jsx']
});

//
// Sets up globals and configuration
//

var env = process.env.NODE_ENV || 'development';

// expose bluebird Promises
global.Promise = Promise;
Promise.longStackTraces();

global.ROOT = path.resolve(__dirname, '..');

// setup environment variables
global.C = nconf
    .file(__dirname + '/' + env + '.json')
    .argv()
    .get();

//
// Logging
//

winston.cli();

var transports = [];

if (C.LOGGING.CONSOLE.ENABLED) {
    transports.push(new winston.transports.Console({
        level: C.LOGGING.CONSOLE.LEVEL,
        handleException: true,
        colorize: true,
        prettyPrint: true,
        depth: 3
    }));
}

if (C.LOGGING.FILE.ENABLED) {
    transports.push(new winston.transports.File({
        handleException: true,
        timestamp: true,
        level: C.LOGGING.CONSOLE.LEVEL,
        colorize: false,
        depth: 3,
        prettyPrint: true,
        json: false,
        filename: path.resolve(ROOT, C.LOGGING.FILE.NAME)
    }));
}

global.Log = new winston.Logger({
    transports: transports
}).cli();
