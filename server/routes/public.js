var router = require('express').Router(),
    util = require('../util');

router.get('/', util.render('index.html'));
router.get('/entry/:id', util.render('index.html'));
router.get('/submit', util.render('index.html'));

module.exports = router;
