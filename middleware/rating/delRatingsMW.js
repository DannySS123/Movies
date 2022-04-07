/**
 * Deletes all the ratings of a movie from the DB based on the id it gets
 * Then redirects to the movies
 */

 module.exports = function (objectrepository) {
    const RatingModel = objectrepository.RatingModel;

    return function (req, res, next) {
        if (typeof res.locals.movie === 'undefined') {
            return next();
        }

        RatingModel.deleteMany({_movie: res.locals.movie._id}, (err) => {
            if (err) {
                return next(err);
        }})
        return next()
    };
};
