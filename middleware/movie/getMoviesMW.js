/**
 * Gets all movies from the DB
 */

module.exports = function (objectrepository) {
    const MovieModel = objectrepository.MovieModel;
    const RatingModel = objectrepository.RatingModel;
     return function (req, res, next) {
        MovieModel.find({}, (err, movies) => {
            if (err) {
                return next(err);
            }

            let promises = []
            movies.forEach(movie => {
                promises.push(RatingModel.find({_movie: movie._id}).exec())
            });

            Promise.all(promises).then((result) => {
                result.forEach((ratings, i) => {
                if (ratings.length === 0) {
                    movies[i].score = "Még nincs értékelés"
                } else {
                    let s = ratings.map(rating=>rating.score).reduce((a,b) => a+b)
                    movies[i].score = (Math.round(100*s/ratings.length) / 100) + ''
                }})
                res.locals.movies = movies
                return next()
            })
        })
     }
 };