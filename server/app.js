var express = require('express'),
    serve = require('serve-static'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    sass = require('node-sass-middleware'),
    browserify = require('browserify-middleware'),
    to5ify = require('6to5ify');

var app = module.exports = express();

// global middleware
app.use(compress());
app.use(bodyParser.json());


// static routes
app.use('/static/style', sass({
    src: __dirname + '/../public/src/style',
    dest:__dirname + '/../public/src/style',
    outputStyle: 'compressed',
    force: true
}));
app.use('/static/', serve(__dirname + '/../public/src/'));

// dynamic routes
app.use('/api', require('./routes/api'));
app.use('/api/admin', require('./routes/admin'));
app.use(require('../app/index.jsx'));
