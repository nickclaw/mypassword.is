var express = require('express'),
    serve = require('serve-static'),
    compress = require('compression'),
    favicon = require('static-favicon');


var app = module.exports = express();

// rendering html
app.set('views', __dirname + '/../build/views');
app.engine('html', require('ejs').renderFile);

// global middleware
app.use(compress());

// static routes
app.use(favicon(__dirname + '/../build/image/favicon.ico'));
app.use('/static/style', serve(__dirname + '/../build/style'));
app.use('/static/script', serve(__dirname + '/../build/script'));
app.use('/static/image', serve(__dirname + '/../build/image'));

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

});
