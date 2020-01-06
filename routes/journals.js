const express = require('express');
const router = express.Router();
const Entry = require('../models/entry');

// GET route

router.get('/', async (req, res) => {
    try {
        const entries = await Entry.find({}, null, { limit: 5, sort: { createdAt: -1 } }, function (err, docs) {
            if (err) return console.error(err);
        })
        res.render('journals.ejs', {
            entries: entries,
            entry: new Entry
        })
    } catch {
        res.redirect('/');
    }
});


// POST route
router.post('/', (req, res) => {
    const entry = new Entry(req.body);
    entry.save()
        .then(item => {
            res.redirect('/journals/#journal-entries')
        })
        .catch(err => {
            res.status(400).send("Unable to save entry to database.");
        });
});

module.exports = router;