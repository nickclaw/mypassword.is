var stub = require('passport-stub'),
    mongoose = require('mongoose');

before(function() {

    return require('../server/index')
        .spread(function(app, db) {
            stub.install(app);
        });

});

describe('mypassword.is website', function() {

    describe('api', function() {
        require('./api/entry-test');
    });

});

after(function() {
    if (mongoose.connection && mongoose.connection.db) {
        if (mongoose.connection.db) mongoose.connection.db.dropDatabase();
        mongoose.connection.close();
    }
});
