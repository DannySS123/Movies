/**
 * Gets a rating from the DB based on the id it gets
 */

module.exports = function (objectrepository) {
    const RatingModel = objectrepository.RatingModel

    return function (req, res, next) {
        RatingModel.findOne(
            {
                _id: req.params.ratingid
            },
            (err, rating) => {
                if (err || !rating) {
                    return next(err);
                }

                res.locals.rating = rating;
                return next();
            }
        );
    };
};