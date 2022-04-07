/**
 * Renders
 */

 module.exports = function (objectrepository, viewName) {
     return function (req, res, next) {
        res.render(viewName, res.locals);
     };
 };