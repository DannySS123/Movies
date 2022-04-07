/**
 * Gets all the ratings from the DB
 */

 module.exports = function (objectrepository) {
    const RatingModel = objectrepository.RatingModel

     return function (req, res, next) {
        RatingModel.find({_movie: res.locals.movie._id }, (err, ratings) => {
            if (err) {
                return next(err);
            }

            res.locals.ratings = ratings;
            return next();
        })
     };
 };