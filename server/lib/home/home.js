module.exports = function (dir) {
  var express = require('express')
    , ENV = process.env['NODE_ENV'] || 'development'
    , gzip = require('connect-gzip')
    , app = express.createServer()
    , publicDir = dir + '/../client'
    ;

  app.set('views', dir + '/views/home')
    .set('view options', { 'layout': false, pretty: true })
    .set('view engine', 'jade');


  app.use(express.bodyParser())
     .use(express.cookieParser())
     .use(express.favicon())
     .use(gzip.gzip({ flags: '--best' }))
  ;

  app.use(express.static(publicDir));

  // Router
  app.use(app.router);

  require('./index')(app);

  return app;
};