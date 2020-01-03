const express = require('express');
const router = express.Router();
const Entry = require('../models/entry');


// GET route
router.get('/', (req, res) => {
    res.render('journal-home.ejs', {entry: new Entry});
});


// POST route
router.post('/journals', (req, res) => {
    const entry = new Entry(req.body);
    entry.save()
        .then(item => {
            res.redirect('/journals')
        })
        .catch(err => {
            res.status(400).send("Unable to save entry to database.");
        });
});

module.exports = router;