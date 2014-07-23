var express = require('express')
  , ENV = process.env['NODE_ENV'] || 'development'
  , config = require('./config')[ENV]
  // The express server to listen for the subdomains
  , app = express()
  // The main application
  , home = require('./lib/home/home')(__dirname)
  // The example subdomain
  , projects = require('./lib/projects/projects')(__dirname)
  ;

// Main application
app.use(express.vhost('localhost', home));

// Example sub domain
app.use(express.vhost('projects.localhost', projects));

app.listen(config.port, function () {
  console.log(('app listening on http://localhost:'+config.port));
});
