var bodyParser = require('body-parser'),
    compress = require('compression'),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session'),
    express = require('express'),
    path = require('path'),
    passport = require('./passport'),
    statics = express.static;

var app = require('express')();

app.use( compress({ threshold: 1024 }) );

//
// Serve static files
//
app.use('/static/', statics( path.resolve(ROOT, C.APP.RES_DIR) ));
app.use('/static/lib/', statics( path.resolve(ROOT, C.APP.LIB_DIR) ));
app.use('/static/', function(req, res, next) {
    Log.silly("Resource not found: %s", req.originalUrl);
    res.send(404);
});

//
// Authentication
//
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cookieSession({
    key: C.SERVER.COOKIE.key,
    secret: C.SERVER.COOKIE.SECRET,
    cookie: { maxAge: C.SERVER.COOKIE.MAXAGE }
}));
app.use( passport.initialize() );
app.use( passport.session() );

// load routes
app.use( require('./routes/') );

//
// Catch all other requests
//
app.use(function(req, res, next) {
    Log.silly("Route not found: %s %s", req.method, req.originalUrl);
    res.send(404);
});

app.use(function(err, req, res, next) {
    Log.error("Uncaught error %s %s", req.method, req.originalUrl);
    Log.error(err);
    res.send(500);
});

module.exports = Promise.try(app.listen, [ C.SERVER.PORT ], app);

module.exports.then(function() {
    Log.info("Server listening on: %s", C.SERVER.PORT);
});
