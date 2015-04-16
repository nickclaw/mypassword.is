var router = require('express').Router(),
    passport = require('passport');

//
// Login
//
router.post('/login', passport.authenticate('local-login'), function(req, res, next) {
    res.send(req.user);
});

//
// Signup
//
router.post('/signup', passport.authenticate('local-signup'), function(req, res, next) {
    res.send(req.user);
});

module.exports = router;
