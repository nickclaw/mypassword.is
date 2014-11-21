var express = require('express'),
    serve = require('serve-static'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    favicon = require('static-favicon'),
    sass = require('node-sass-middleware');



var app = module.exports = express();

// rendering html
app.set('views', __dirname + '/../src/views');
app.engine('html', require('ejs').renderFile);

// global middleware
app.use(compress());
app.use(bodyParser.json());

// static routes
app.use(favicon(__dirname + '/../build/image/favicon.ico'));
app.use('/static/style', sass({
    src: __dirname + '/../src/style',
    dest:__dirname + '/../src/style',
    outputStyle: 'compressed',
    force: true
}));
app.use('/static/script', serve(__dirname + '/../src/script'));
app.use('/static/image', serve(__dirname + '/../src/image'));

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
