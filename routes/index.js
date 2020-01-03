const express = require('express');
const router = express.Router();

// GET route
router.get('/', (req, res) => {
    res.render('index.ejs');
});

module.exports = router;