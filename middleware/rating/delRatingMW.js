/**
 * Deletes a rating from the DB based on the id it gets
 */

 module.exports = function (objectrepository) {
     return function (req, res, next) {
        if (typeof res.locals.rating === 'undefined') {
            return next();
        }

        res.locals.rating.remove(err => {
            if (err) {
                return next(err);
            }

            return res.redirect(`/movies/${res.locals.movie._id}`);
        });
     };
 };