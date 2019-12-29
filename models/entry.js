const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    entry: String,
    createdAt: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('entry', entrySchema)