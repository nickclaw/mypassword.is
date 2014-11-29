var aws = require('aws-sdk'),
    express = require('express'),
    config = require('../config'),
    serve = require('serve-static'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    favicon = require('static-favicon'),
    sass = require('node-sass-middleware');


aws.config.update(config.aws);

var app = module.exports = express();

// rendering html
app.set('views', __dirname + '/../public/src/views');
app.engine('html', require('ejs').renderFile);

// global middleware
app.use(compress());
app.use(bodyParser.json());

// static routes
app.use(favicon(__dirname + '/../public/build/image/favicon.ico'));
app.use('/static/style', sass({
    src: __dirname + '/../public/src/style',
    dest:__dirname + '/../public/src/style',
    outputStyle: 'compressed',
    force: true
}));
app.use('/static/lib', serve(__dirname + '/../public/lib'));
app.use('/static/template', serve(__dirname + '/../public/src/template'));
app.use('/static/script', serve(__dirname + '/../public/src/script'));
app.use('/static/image', serve(__dirname + '/../public/src/image'));

// dynamic routes
app.use('/api', require('./routes/api'));
app.use('/admin', require('./routes/admin'));
app.use(require('./routes/public'));

// catch all request that dont match
app.get('*', function(req, res) {
    res.send(404);
});

// catch all errors that fall through
app.use(function(err, req, res, next) {
    console.error(err.message, err.stack);
    res.send(500);
});
