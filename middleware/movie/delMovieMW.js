/**
 * Deletes a movie from the DB based on the id it gets
 * Then redirects to the movies
 */

 module.exports = function (objectrepository) {
     return function (req, res, next) {
        if (typeof res.locals.movie === 'undefined') {
            return next();
        }

        res.locals.movie.remove(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/');
        });
     };
 };