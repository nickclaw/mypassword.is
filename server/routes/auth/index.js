var router = require('express').Router();

router
    .use('/local', require('./local') )
    .post('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    })
;

module.exports = router;
