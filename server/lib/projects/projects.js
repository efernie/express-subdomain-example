module.exports = function (dir) {
  var express = require('express'),
      ENV = process.env['NODE_ENV'] || 'development',
      app = express(),
      publicDir = dir + '/../client';

  app.set('views', dir + '/views/projects')
    .set('view options', { 'layout': false, pretty: true })
    .set('view engine', 'jade');


  app.use(express.bodyParser())
     .use(express.cookieParser())
     .use(express.favicon());

  app.use(express.static(publicDir));

  // Router
  app.use(app.router);

  require('./index')(app);

  return app;
};