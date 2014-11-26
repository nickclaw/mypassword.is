var router = require('express').Router();

router.get('/', function(req, res) {
    res.render('index.html');
});

router.get('/entry/:id', function(req, res) {
    res.render('index.html');
});

module.exports = router;
