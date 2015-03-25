var express = require('express'),
    serve = require('serve-static'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    favicon = require('static-favicon'),
    sass = require('node-sass-middleware'),
    browserify = require('browserify-middleware'),
    to5ify = require('6to5ify');

var app = module.exports = express();

// global middleware
app.use(compress());
app.use(bodyParser.json());

// javascript
app.use('/static/script/app.js', browserify('./app/index.jsx', {
    transform: [
        to5ify.configure({
            experimental: true
        })
    ],
    precompile: true,
    cache: true
}));

// static routes
app.use(favicon(__dirname + '/../public/build/image/favicon.ico'));
app.use('/static/style', sass({
    src: __dirname + '/../public/src/style',
    dest:__dirname + '/../public/src/style',
    outputStyle: 'compressed',
    force: true
}));
app.use('/static/template', serve(__dirname + '/../public/src/template'));
app.use('/static/image', serve(__dirname + '/../public/src/image'));

// dynamic routes
app.use('/api', require('./routes/api'));
app.use('/api/admin', require('./routes/admin'));
app.use(require('../app/index.jsx'));
