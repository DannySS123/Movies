/**
 * After submitting a form, it saves the rating to the DB
 */

module.exports = function (objectrepository) {
    const RatingModel = objectrepository.RatingModel;

    return function (req, res, next) {
        if (typeof req.body.name === 'undefined' ||
            typeof req.body.desc === 'undefined' ||
            typeof req.body.score === 'undefined' ||
            typeof res.locals.movie._id === 'undefined') {
            return next();
        }

        if (req.body.name === '' ||
            req.body.desc === '' ||
            req.body.score === '') {
            res.locals.myErr = "A nevet, a leírást és az értékelést is ki kell tölteni!"
            return next()
        }

        req.body.name = req.body.name.trim()
        req.body.desc = req.body.desc.trim()
        if (req.body.name === '' || req.body.desc === '') {
            res.locals.myErr = "A név és a leírás se lehet csak space!"
            return next();
        }

        if (req.body.score < 0 ||
            req.body.score > 5 ||
            isNaN(req.body.score)
        ) {
            res.locals.myErr = "Ne varázsolj :)"
            return next()
        }

        if (typeof res.locals.rating === 'undefined') {
            res.locals.rating = new RatingModel();
        }

        res.locals.rating.name = req.body.name;
        res.locals.rating.desc = req.body.desc;
        res.locals.rating.score = parseInt(req.body.score);
        res.locals.rating._movie = res.locals.movie._id;

        res.locals.rating.save(err => {
            if (err) {
                return next(err);
            }
        });
        return res.redirect(`/movies/${res.locals.movie._id}`);
    };
};