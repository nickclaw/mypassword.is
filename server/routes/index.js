var router = require('express').Router();

router
    .use('/api', require('./api/') )
    .use('/auth', require('./auth/') )
;

module.exports = router;
