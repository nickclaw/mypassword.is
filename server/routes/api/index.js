var router = require('express').Router();

router
    //
    // put subroutes here
    //

    //
    // Catch api errors
    //
    .use(function(req, res, next) {
        Log.silly("Route not found %s %s", req.method, req.originalUrl);
        res.send(404, {/* payload */});
    })
    .use(function(err, req, res, next) {
        Log.error("Uncaught error %s %s", req.method, req.originalUrl);
        Log.error(err);

        res.send(500, {/* payload */});
    });

module.exports = router;
