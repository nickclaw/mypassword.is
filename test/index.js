var stub = require('passport-stub');

before(function() {

    return require('../server/index')
        .spread(function(app) {
            stub.install(app);

            //
            // Load fixtures here if you want
            //
        });

});

describe('the application', function() {

    //
    // Require other tests here
    //

});

after(function() {

    //
    // Cleanup/drop database
    //

});
