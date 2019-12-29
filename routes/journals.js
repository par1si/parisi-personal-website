const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Entry = require('../models/entry');


router.get('/', async (req, res) => {
    try {
        const entries = await Entry.find(function (err, docs) {
            if (err) return console.error(err);
        })
        res.render('journals.ejs', {
            entries: entries
        })
    } catch {
        res.redirect('/');
    }
});

module.exports = router;