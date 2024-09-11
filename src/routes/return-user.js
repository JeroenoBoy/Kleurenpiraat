const router = require('express').Router();

router.get('/:id', (req, res) => {
    res.redirect('/');
});

module.exports = router;