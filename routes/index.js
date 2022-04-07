const renderMW = require('../middleware/renderMW');

const getMovieMW = require('../middleware/movie/getMovieMW')
const getMoviesMW = require('../middleware/movie/getMoviesMW')
const saveMovieMW = require('../middleware/movie/saveMovieMW')
const delMovieMW = require('../middleware/movie/delMovieMW')

const getRatingMW = require('../middleware/rating/getRatingMW')
const getRatingsMW = require('../middleware/rating/getRatingsMW')
const saveRatingMW = require('../middleware/rating/saveRatingMW')
const delRatingMW = require('../middleware/rating/delRatingMW')
const delRatingsMW = require('../middleware/rating/delRatingsMW')

const MovieModel = require('../models/movie');
const RatingModel = require('../models/rating');

module.exports = function (app) {
    const objRepo = {
        MovieModel: MovieModel,
        RatingModel: RatingModel
    };

    app.get('/movies/del/:movieid',
        getMovieMW(objRepo),
        getRatingsMW(objRepo),
        delRatingsMW(objRepo),
        delMovieMW(objRepo))

    app.use('/movies/new',
        saveMovieMW(objRepo),
        renderMW(objRepo, 'newMovie'))

    app.use('/movies/edit/:movieid',
        getMovieMW(objRepo),
        saveMovieMW(objRepo),
        renderMW(objRepo, 'editMovie'))

    app.get('/movies/:movieid',
        getMovieMW(objRepo),
        getRatingsMW(objRepo),
        renderMW(objRepo, 'movie'))

    app.get('/movies/:movieid/del/:ratingid',
        getMovieMW(objRepo),
        getRatingMW(objRepo),
        delRatingMW(objRepo))

    app.use('/movies/:movieid/new',
        getMovieMW(objRepo),
        saveRatingMW(objRepo),
        renderMW(objRepo, 'newRating'))

    app.use('/movies/:movieid/edit/:ratingid',
        getMovieMW(objRepo),
        getRatingMW(objRepo),
        saveRatingMW(objRepo),
        renderMW(objRepo, 'editRating'))

    app.get('/',
        getMoviesMW(objRepo),
        renderMW(objRepo, 'index'))

};