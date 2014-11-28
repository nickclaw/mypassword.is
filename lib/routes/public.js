var router = require('express').Router();

router.get('/', serveIndex);
router.get('/entry/:id', serveIndex);
router.get('/submit', serveIndex);

module.exports = router;

function serveIndex(req, res) {
    res.render('index.html');
}
