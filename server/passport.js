var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    {ValidationError} = require('vlad');

passport.serializeUser(function(user, done) {
    done(user ? 'true' : 'false');
});

passport.deserializeUser(function(id, done) {
    done(id === 'true');
});

passport.use('local-login', new LocalStrategy({
    usernameField: 'username'
}, function(username, password, done) {

    if(username === 'admin' && password === 'password') {
        done(null, true);
    } else {
        done(ValidationError());
    }
}));

module.exports = passport;
