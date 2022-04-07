const expect = require('chai').expect;
const saveMovieMW = require('../middleware/movie/saveMovieMW');

describe('saveMovie middleware ', function () {
    it('movie does not have title', function (done) {
        const req = {
            body: {
                title: undefined
            }
        };
        const res = {
            locals: {
                movie: {
                    title: undefined
                },
                myErr: undefined
            }
        };
        saveMovieMW({
            MovieModel: undefined
        })(req, res, function (err) {
            expect(req.body.title).to.eql(undefined);
            expect(res.locals.movie.title).to.eql(undefined);
            expect(res.locals.myErr).to.eql(undefined);
            expect(err).to.eql(undefined);
            done();
        });
    });
});

describe('saveMovie middleware ', function () {
    it('movie does not have a fitting title', function (done) {
        const req = {
            body: {
                title: '    '
            }
        };
        const res = {
            locals: {
                movie: {
                    title: undefined
                },
                myErr: undefined
            }
        };
        saveMovieMW({
            MovieModel: undefined
        })(req, res, function (err) {
            expect(req.body.title).to.eql('');
            expect(res.locals.movie.title).to.eql(undefined);
            expect(res.locals.myErr).to.eql('A címet meg kell adni!');
            expect(err).to.eql(undefined);
            done();
        });
    });
});


describe('saveMovie middleware ', function () {
    it('should create and save the movie', function (done) {
        const req = {
            body: {
                title: 'Big Chungus'
            }
        };
        const res = {
            locals: {
                movie: undefined,
                myErr: {},
            },
            redirect: function(some){
                expect(res.locals.movie).to.not.eql(undefined);
                expect(res.locals.movie.title).to.eql('Big Chungus')
                done();
            }
        };
        class fakeMovieModel {
            save(cb) {
                cb(undefined)
            }
        };
        saveMovieMW({
            MovieModel: fakeMovieModel
        })(req, res);
    });
});

describe('saveMovie middleware ', function () {
    it('should save the movie', function (done) {
        const req = {
            body: {
                title: 'Big Chungus'
            }
        };
        const res = {
            locals: {
                movie: {
                    title: {},
                    save: function(cb) {
                        cb(undefined)
                    }
                },
                myErr: undefined
            },
            redirect: function(){
                expect(res.locals.movie.title).to.eql('Big Chungus');
                expect(res.locals.myErr).to.eql(undefined);
                done();
            }
        };

        saveMovieMW({
            MovieModel: undefined
        })(req, res);
    });
});


describe('saveMovie middleware ', function () {
    it('saving error', function (done) {
        const req = {
            body: {
                title: 'Big Chungus'
            }
        };
        const res = {
            locals: {
                movie: {
                    title: undefined,
                    save: function(cb) {
                        cb('saving error')
                    }
                },
                myErr: undefined
            }
        };
        saveMovieMW({
            MovieModel: undefined
        })(req, res, function (err) {
            expect(req.body.title).to.eql('Big Chungus');
            expect(res.locals.movie.title).to.eql('Big Chungus');
            expect(res.locals.myErr).to.eql(undefined);
            expect(err).to.eql('saving error');
            done();
        });
    });
});