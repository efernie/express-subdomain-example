var express = require('express')
  , ENV = process.env['NODE_ENV'] || 'development'
  , config = require('./config')[ENV]
  , cluster = require('cluster')
  , app = express.createServer()
  , home = require('./lib/home/home')(__dirname)
  , projects = require('./lib/projects/projects')(__dirname)
;

app.use(express.vhost('localhost', home));
app.use(express.vhost('projects.localhost', projects));

if (cluster.isMaster) {
  for (var i = 0; i < 1; i++) {
    cluster.fork();
  }
  cluster.on('death', function(worker) {
    console.log('worker ' + worker.pid + ' died');
  });
} else {
  app.listen(config.port, function () {
    var addr = app.address();
    console.log(('   app listening on http://' + addr.address + ':' + addr.port));
  });
}
