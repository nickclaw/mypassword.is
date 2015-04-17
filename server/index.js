var cluster = require('cluster');

module.exports = Promise.all([
    require('./app'),
    require('./database'),
    // require('./some_other_service')
]);

module.exports.then(
    function() {
        Log.info("App ready!");
    },
    function(err) {
        Log.error("Could not start app.");
        Log.error(err);
        cluster.worker.disconnect();
    }
);
