const express = require('express');
const router = express.Router();

// GET route
router.get('/', (req, res) => {
    res.render('proposal-helper.ejs');
});

module.exports = router;