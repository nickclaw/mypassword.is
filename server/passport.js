var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
    done(user.id);
});

passport.deserializeUser(function(id, done) {
    // TODO
    done();
});

passport.use('local-login', new LocalStrategy({
    usernameField: 'username'
}, function(username, password, done) {

    //
    // Create new user
    //

    done();
}));

passport.use('local-signup', new LocalStrategy({
    usernameField: 'username'
}, function(username, password, done) {

    //
    // Find user by username
    // then check that passwords match
    //

    done();
}));

module.exports = passport;
