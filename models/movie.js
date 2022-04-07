const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Movie = db.model('Movie', {
    title: String,
});

module.exports = Movie;