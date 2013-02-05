var ENV = process.env['NODE_ENV'] || 'development',
    config = require('../../config')[ENV];

module.exports = function (app) {

  // Index Page
  app.get('/', function(req, res) {
    res.render('index');
  });

}