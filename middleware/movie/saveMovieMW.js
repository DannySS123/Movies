/**
 * After submitting a form, it saves the movie to the DB
 */

module.exports = function (objectrepository) {
    const MovieModel = objectrepository.MovieModel;

    return function (req, res, next) {
        if (typeof req.body.title === 'undefined') {
            return next();
        }
        req.body.title = req.body.title.trim()
        if (req.body.title === '') {
            res.locals.myErr = 'A címet meg kell adni!'
            return next();
        }

        if (typeof res.locals.movie === 'undefined') {
            res.locals.movie = new MovieModel();
        }

        res.locals.movie.title = req.body.title;

        res.locals.movie.save(err => {
            if (err) {
                return next(err);
            }
        });
        return res.redirect('/');
     };
 };