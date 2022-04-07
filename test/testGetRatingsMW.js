const expect = require('chai').expect;
const getRatingsMW = require('../middleware/rating/getRatingsMW');
describe('getRatings middleware ', function () {
    it('should return ratings', function (done) {
        const req = {};
        const res = {
            locals: {
                movie: {
                    _id: {}
                }
            }
        };
        const fakeRatingModel = {
            find: function (some, cb) {
                cb(undefined, ['name', 'desc', 5, {type: 'id', ref: 'Movie'}])
            }
        };
        getRatingsMW({
            RatingModel: fakeRatingModel
        })(req, res, function (err) {
            expect(res.locals.ratings).to.eql(['name', 'desc', 5, {type: 'id', ref: 'Movie'}]);
            expect(err).to.eql(undefined);
            done();
        });
    });
});

describe('getRatings middleware ', function () {
    it('should return error', function (done) {
        const req = {};
        const res = {
            locals: {
                movie: {
                    _id: {}
                }
            }
        };
        const fakeRatingModel = {
            find: function (some, cb) {
                cb('myError', undefined)
            }
        };
        getRatingsMW({
            RatingModel: fakeRatingModel
        })(req, res, function (err) {
            expect(res.locals.ratings).to.eql(undefined);
            expect(err).to.eql('myError');
            done();
        });
    });
});