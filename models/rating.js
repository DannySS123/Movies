const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Rating = db.model('Rating', {
    name: String,
    desc: String,
    score: Number,
    _movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie'
    }
});

module.exports = Rating;