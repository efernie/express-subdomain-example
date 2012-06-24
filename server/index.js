var express = require('express')
  , ENV = process.env['NODE_ENV'] || 'development'
  , config = require('./config')[ENV]
  , app = express.createServer()
  , home = require('./lib/home/home')(__dirname)
  , projects = require('./lib/projects/projects')(__dirname)
  ;

// Main application
app.use(express.vhost('localhost', home));

// Example sub domain
app.use(express.vhost('projects.localhost', projects));

app.listen(config.port, function () {
  var addr = app.address();
  console.log(('   app listening on http://' + addr.address + ':' + addr.port));
});

