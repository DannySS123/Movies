/**
 * Gets a movie from the DB based on the id it gets
 */

 module.exports = function (objectrepository) {
    const MovieModel = objectrepository.MovieModel;
    return function (req, res, next) {
        MovieModel.findOne(
            {
                _id: req.params.movieid
            },
            (err, movie) => {
                if (err || !movie) {
                    return next(err);
                }

                res.locals.movie = movie;
                return next();
            }
        );
     };
 };